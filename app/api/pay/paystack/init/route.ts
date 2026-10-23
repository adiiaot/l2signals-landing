import { NextRequest, NextResponse } from 'next/server'
import { hasAdminCredentials } from '@/lib/firebase-admin'
import { attachPaystackReference, claimIsUsable, findClaimByToken } from '@/lib/payments/claims'
import { getPaymentsConfig, isPaystackConfigured } from '@/lib/payments/config'
import { initializeTransaction, newReference, paystackCurrency } from '@/lib/payments/paystack'
import { clientKey, rateLimit } from '@/lib/payments/rate-limit'
import { normalizeEmail, str } from '@/lib/payments/validate'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * POST /api/pay/paystack/init — start a hosted Paystack checkout.
 *
 * Creates the transaction server-side from the configured plan price. Paystack then
 * redirects back to /pay where the charge is verified against their API — the
 * redirect alone is never treated as proof of payment.
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
      { ok: false, error: 'Card payments are not available yet. Use crypto or bank transfer.' },
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

  const config = await getPaymentsConfig()
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
      },
    })

    if (usableClaim) {
      await attachPaystackReference(usableClaim.id, reference).catch(() => undefined)
    }

    return NextResponse.json({
      ok: true,
      authorizationUrl: transaction.authorization_url,
      reference: transaction.reference || reference,
      amount: amountMajor,
      currency,
    })
  } catch (error) {
    console.error('[pay] paystack init failed:', error)
    return NextResponse.json(
      { ok: false, error: 'Card checkout could not be started. Try bank transfer or crypto.' },
      { status: 502 }
    )
  }
}
