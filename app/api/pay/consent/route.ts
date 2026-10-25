import { NextRequest, NextResponse } from 'next/server'
import { hasAdminCredentials } from '@/lib/firebase-admin'
import { OFFER } from '@/data/business'
import { createConsent } from '@/lib/payments/consent'
import { getPaymentsConfig } from '@/lib/payments/config'
import { clientKey, rateLimit } from '@/lib/payments/rate-limit'
import { looksLikeBot, normalizeEmail } from '@/lib/payments/validate'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * POST /api/pay/consent — record pre-payment consent.
 *
 * The browser sends the `{ slug: version }` map it displayed, plus the email the
 * payment will use. The server recomputes the required set from `data/legal.ts`
 * and only writes a record when every required document is at its current
 * version. The returned id is consumed exactly once by a payment route.
 *
 * No price is accepted from the browser: the plan stored on the consent record
 * is read from `config/payments`, the same source the payment routes charge from.
 */
export async function POST(req: NextRequest) {
  if (!hasAdminCredentials()) {
    return NextResponse.json(
      { ok: false, error: 'Payments are not configured yet. Please contact us on Telegram.' },
      { status: 503 }
    )
  }

  // Consent creation is cheap but should not be a writing primitive for bots.
  const limited = rateLimit(clientKey(req, 'consent'), 20, 10 * 60_000)
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, error: 'Too many attempts. Try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(limited.retryAfterSeconds) } }
    )
  }

  const body = await req.json().catch(() => null)
  if (!body || looksLikeBot(body.company)) {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }

  const email = normalizeEmail(body.email)
  if (!email) {
    return NextResponse.json({ ok: false, error: 'Enter a valid email address.' }, { status: 400 })
  }

  const config = await getPaymentsConfig()

  // `foundingApplicable` is decided server-side from the offer being sold. A
  // tampered page cannot drop the founding consent requirement.
  const result = await createConsent({
    email,
    accepted: body.accepted,
    plan: {
      ngn: config.plan.ngn,
      usd: config.plan.usd,
      days: config.plan.days,
      graceDays: config.plan.graceDays,
    },
    productId: OFFER.productId,
    productName: OFFER.product,
    foundingApplicable: OFFER.foundingApplicable,
    ipKey: clientKey(req, 'consent'),
    userAgent: req.headers.get('user-agent') || '',
  })

  if (!result.ok) {
    const status = result.code === 'unavailable' ? 503 : 400
    return NextResponse.json(
      {
        ok: false,
        error: result.error,
        code: result.code,
        missing: result.missing || [],
        mismatched: result.mismatched || [],
      },
      { status }
    )
  }

  return NextResponse.json({
    ok: true,
    consentId: result.consentId,
    accepted: result.accepted,
    expiresAt: result.expiresAt,
    product: OFFER.product,
    plan: {
      ngn: config.plan.ngn,
      usd: config.plan.usd,
      days: config.plan.days,
    },
  })
}
