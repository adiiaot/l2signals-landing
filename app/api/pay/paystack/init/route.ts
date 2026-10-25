import { NextRequest, NextResponse } from 'next/server'
import { hasAdminCredentials } from '@/lib/firebase-admin'
import { attachPaystackReference, claimIsUsable, findClaimByToken } from '@/lib/payments/claims'
import { getPaymentsConfig, isPaystackConfigured } from '@/lib/payments/config'
import { attachConsentReference, consumeConsent, type ConsentFailureCode } from '@/lib/payments/consent'
import { initializeTransaction, newReference, paystackCurrency } from '@/lib/payments/paystack'
import { clientKey, rateLimit } from '@/lib/payments/rate-limit'
import { normalizeEmail, str } from '@/lib/payments/validate'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function consentStatus(code: ConsentFailureCode): number {
  if (code === 'used' || code === 'plan_changed') return 409
  if (code === 'unavailable') return 503
  return 400
}

/**
 * POST /api/pay/paystack/init — start a hosted Paystack checkout.
 *
 * Consent is required BEFORE a checkout exists. The consent id is consumed
 * atomically here, attached to the transaction metadata, and stored on the
 * consent record next to the Paystack reference. The redirect back to /pay is
 * still only a hint: the charge is verified against Paystack's API.
 */
export async function POST(req: NextRequest) {
  if (!hasAdminCredentials()) {
    return NextResponse.json(
      { ok: false, error: 'Payments are not configured yet. Please contact us on Telegram.' },
      { status: 503 }
    )
  }
  if (!isPaystackConfigured()) {
    return NextResponse.json(
      { ok: false, error: 'Online payments are not available yet. Use crypto or bank transfer.' },
      { status: 503 }
    )
  }

  const limited = rateLimit(clientKey(req, 'paystack-init'), 8, 10 * 60_000)
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, error: 'Too many attempts. Try again in a few minutes.' },
      { status: 429, headers: { 'Retry-After': String(limited.retryAfterSeconds) } }
    )
  }

  const body = await req.json().catch(() => null)
  const email = normalizeEmail(body?.email)
  if (!email) return NextResponse.json({ ok: false, error: 'Enter a valid email address.' }, { status: 400 })

  const consentId = str(body?.consentId, 80)
  if (!consentId) {
    return NextResponse.json(
      {
        ok: false,
        consentRequired: true,
        error: 'Accept the required documents before payment. Reload the page and review them again.',
      },
      { status: 400 }
    )
  }

  const config = await getPaymentsConfig()

  const consent = await consumeConsent({
    id: consentId,
    email,
    mode: 'init',
    expectedPlan: { ngn: config.plan.ngn, usd: config.plan.usd, days: config.plan.days },
  })
  if (!consent.ok) {
    return NextResponse.json(
      {
        ok: false,
        consentRequired: true,
        error: consent.error,
        code: consent.code,
      },
      { status: consentStatus(consent.code) }
    )
  }

  const currency = paystackCurrency()
  const amountMajor = currency === 'NGN' ? config.plan.ngn : config.plan.usd
  const amountMinor = Math.round(amountMajor * 100)

  if (!Number.isFinite(amountMinor) || amountMinor < 100) {
    console.error('[pay] invalid paystack amount from config:', { currency, amountMajor })
    return NextResponse.json(
      { ok: false, error: 'Pricing is not set up yet. Please contact us on Telegram.' },
      { status: 503 }
    )
  }

  try {
    const token = str(body?.token, 80)
    const claim = token ? await findClaimByToken(token) : null
    const usableClaim = claim && claim.email === email && claimIsUsable(claim) ? claim : null

    const reference = newReference()
    const transaction = await initializeTransaction({
      email,
      amountMinor,
      currency,
      reference,
      callbackUrl: `${req.nextUrl.origin}/pay`,
      metadata: {
        claimId: usableClaim?.id || '',
        email,
        plan: 'signals_group',
        consentId,
        accepted: consent.record.accepted,
        consentAt: consent.record.createdAt?.toDate().toISOString() || '',
      },
    })

    const confirmedReference = transaction.reference || reference

    // Both writes are best-effort bookkeeping: the metadata above is the
    // authoritative link, and verify can still match by consentId.
    await attachConsentReference(consentId, confirmedReference).catch(() => undefined)
    if (usableClaim) {
      await attachPaystackReference(usableClaim.id, confirmedReference).catch(() => undefined)
    }

    return NextResponse.json({
      ok: true,
      authorizationUrl: transaction.authorization_url,
      reference: confirmedReference,
      amount: amountMajor,
      currency,
    })
  } catch (error) {
    console.error('[pay] paystack init failed:', error)
    return NextResponse.json(
      { ok: false, error: 'Online checkout could not be started. Try bank transfer or crypto.' },
      { status: 502 }
    )
  }
}
