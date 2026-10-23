import { NextRequest, NextResponse } from 'next/server'
import { hasAdminCredentials } from '@/lib/firebase-admin'
import { isValidTxHash } from '@/lib/payments/chains'
import {
  claimIsUsable,
  findClaimByToken,
  markClaimSubmitted,
  recordPayment,
} from '@/lib/payments/claims'
import { getPaymentsConfig } from '@/lib/payments/config'
import { verifyWithBot } from '@/lib/payments/bot-verify'
import { clientKey, rateLimit } from '@/lib/payments/rate-limit'
import { looksLikeBot, normalizeEmail, str } from '@/lib/payments/validate'
import { PAYMENT_NETWORKS, PaymentNetwork } from '@/lib/payments/types'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const NETWORKS = new Set<string>(PAYMENT_NETWORKS)

/**
 * POST /api/pay/submit — crypto hash or bank-transfer reference.
 *
 * The browser never sends a price. Amount and currency are recomputed here from
 * `config/payments`, so a tampered request can only ever claim the real price.
 */
export async function POST(req: NextRequest) {
  if (!hasAdminCredentials()) {
    return NextResponse.json(
      { ok: false, error: 'Payments are not configured yet. Please contact us on Telegram.' },
      { status: 503 }
    )
  }

  const limited = rateLimit(clientKey(req, 'submit'), 8, 10 * 60_000)
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, error: 'Too many submissions. Try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(limited.retryAfterSeconds) } }
    )
  }

  const body = await req.json().catch(() => null)
  if (!body || looksLikeBot(body.company)) {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }

  const email = normalizeEmail(body.email)
  if (!email) return NextResponse.json({ ok: false, error: 'Enter a valid email address.' }, { status: 400 })

  const method = str(body.method)
  if (method !== 'crypto' && method !== 'bank') {
    return NextResponse.json({ ok: false, error: 'Choose a payment method.' }, { status: 400 })
  }

  const config = await getPaymentsConfig()

  let network: PaymentNetwork | null = null
  let reference = ''
  let adminNotes = ''

  if (method === 'crypto') {
    const requested = str(body.network)
    if (!NETWORKS.has(requested) || !config.addresses[requested as PaymentNetwork]) {
      return NextResponse.json(
        { ok: false, error: 'That network is not available. Pick another.' },
        { status: 400 }
      )
    }
    network = requested as PaymentNetwork

    reference = str(body.txHash, 120)
    if (!reference) {
      return NextResponse.json({ ok: false, error: 'Paste the transaction hash.' }, { status: 400 })
    }
    if (!isValidTxHash(network, reference)) {
      return NextResponse.json(
        {
          ok: false,
          error: `That does not look like a ${network.toUpperCase()} transaction hash. Copy it from the explorer.`,
        },
        { status: 400 }
      )
    }
  } else {
    if (!config.methods.ngn.enabled) {
      return NextResponse.json(
        { ok: false, error: 'Bank transfer is not available right now. Use card or crypto.' },
        { status: 400 }
      )
    }
    reference = str(body.reference, 120)
    if (reference.length < 6) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Enter the transfer reference or narration from your bank receipt (at least 6 characters).',
        },
        { status: 400 }
      )
    }
    adminNotes = str(body.note, 500)
  }

  try {
    let claim = null
    const token = str(body.token, 80)
    if (token) {
      const candidate = await findClaimByToken(token)
      // A claim only vouches for the email it was created with — otherwise a leaked
      // token could attach someone else's Telegram account to your payment.
      if (candidate && candidate.email === email && claimIsUsable(candidate)) {
        claim = candidate
      }
    }

    const isCrypto = method === 'crypto'

    // Manual-first (2026-10-23): the operator verifies every payment by hand and
    // adds the member personally. Auto-verification is kept for later and only
    // runs when PAYMENTS_AUTO_VERIFY=true — flipping that flag must never be the
    // difference between "manual review" and "silently granted".
    const autoVerify = process.env.PAYMENTS_AUTO_VERIFY === 'true'

    if (isCrypto && network && autoVerify) {
      const verification = await verifyWithBot({
        txHash: reference,
        network,
        email,
        token: str(body.token, 80) || undefined,
      })

      if (verification?.verified) {
        if (claim) await markClaimSubmitted(claim.id).catch(() => undefined)
        return NextResponse.json({
          ok: true,
          verified: true,
          paymentId: verification.paymentId,
          amount: verification.amount ?? config.plan.usd,
          currency: verification.asset || 'USD',
          inviteLink: verification.inviteLink || null,
          telegramVerified: Boolean(claim?.telegramId),
        })
      }

      adminNotes = verification
        ? `Auto-verify: ${verification.reason || 'not verified'}`
        : 'Auto-verify unavailable (bot offline) — manual review'
    } else {
      adminNotes = 'Manual review — payer sends proof on Telegram'
    }

    const result = await recordPayment({
      email,
      method,
      provider: 'manual',
      amount: isCrypto ? config.plan.usd : config.plan.ngn,
      currency: isCrypto ? 'USD' : 'NGN',
      reference,
      network,
      claim,
      adminNotes,
    })

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error },
        { status: result.code === 'duplicate' ? 409 : 500 }
      )
    }

    if (claim) {
      await markClaimSubmitted(claim.id).catch(() => undefined)
    }

    return NextResponse.json({
      ok: true,
      verified: false,
      paymentId: result.paymentId,
      amount: isCrypto ? config.plan.usd : config.plan.ngn,
      currency: isCrypto ? 'USD' : 'NGN',
      telegramVerified: Boolean(claim?.telegramId),
    })
  } catch (error) {
    console.error('[pay] submit failed:', error)
    return NextResponse.json({ ok: false, error: 'Could not save the payment. Try again.' }, { status: 500 })
  }
}
