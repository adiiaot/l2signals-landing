import { NextRequest, NextResponse } from 'next/server'
import { hasAdminCredentials } from '@/lib/firebase-admin'
import {
  claimIsUsable,
  findClaimByPaystackReference,
  markClaimSubmitted,
  recordPayment,
} from '@/lib/payments/claims'
import { getPaymentsConfig } from '@/lib/payments/config'
import { attachConsentPayment, resolvePaystackConsent } from '@/lib/payments/consent'
import { verifyTransaction } from '@/lib/payments/paystack'
import { clientKey, rateLimit } from '@/lib/payments/rate-limit'
import { str } from '@/lib/payments/validate'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * GET /api/pay/paystack/verify?reference=…
 *
 * Runs after Paystack redirects back. Always re-checks the charge against the
 * Paystack API — a query string is attacker-controlled and proves nothing.
 *
 * The consent link comes from the transaction metadata Paystack returns (not
 * from the URL). A successful charge with no usable consent record is still
 * recorded for reconciliation, but it is explicitly flagged for manual review.
 */
export async function GET(req: NextRequest) {
  if (!hasAdminCredentials()) {
    return NextResponse.json({ ok: false, error: 'Payments are not configured.' }, { status: 503 })
  }

  const limited = rateLimit(clientKey(req, 'paystack-verify'), 40, 60_000)
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, error: 'Too many checks. Wait a minute.' },
      { status: 429, headers: { 'Retry-After': String(limited.retryAfterSeconds) } }
    )
  }

  const reference = str(new URL(req.url).searchParams.get('reference'))
  if (!reference) return NextResponse.json({ ok: false, error: 'Missing reference.' }, { status: 400 })

  try {
    const transaction = await verifyTransaction(reference)

    if (transaction.status !== 'success') {
      return NextResponse.json({ ok: false, status: transaction.status, error: 'Payment was not completed.' })
    }

    const config = await getPaymentsConfig()
    const currency = transaction.currency === 'USD' ? 'USD' : 'NGN'
    const expected = currency === 'USD' ? config.plan.usd : config.plan.ngn
    const paid = transaction.amount / 100

    const claim = await findClaimByPaystackReference(reference)
    const usable = claim && claimIsUsable(claim) ? claim : null

    // ── Consent: read from Paystack metadata, never from the query string ────
    const { consent, issue: consentIssue } = await resolvePaystackConsent({
      consentId: str(transaction.metadata?.consentId, 80),
      reference,
      customerEmail: transaction.customer?.email,
    })

    // Paystack charges exactly what we asked for; a shortfall means the price moved
    // between checkout and confirmation. Flag it for review instead of rejecting.
    const notes: string[] = []
    if (paid + 0.01 < expected) {
      notes.push(`Amount mismatch — paid ${currency} ${paid.toFixed(2)}, expected ${currency} ${expected.toFixed(2)}`)
    }
    if (consentIssue) {
      notes.push(`${consentIssue} — do not grant access until checked`)
    }

    const result = await recordPayment({
      email: consent?.email || usable?.email || transaction.customer?.email || '',
      method: 'paystack',
      provider: 'paystack',
      amount: paid,
      currency,
      reference,
      claim: usable,
      adminNotes: notes.join(' · '),
      consentId: consent?.id || '',
      consentVersions: consent?.accepted || {},
      consentAcceptedAt: consent?.createdAt || null,
      idempotent: true,
    })

    if (!result.ok) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 500 })
    }

    if (consent) {
      await attachConsentPayment(consent.id, result.paymentId, reference).catch((error) =>
        console.error('[pay] could not attach payment to consent:', error)
      )
    }

    if (usable) await markClaimSubmitted(usable.id).catch(() => undefined)

    return NextResponse.json({
      ok: true,
      status: 'success',
      paymentId: result.paymentId,
      amount: paid,
      currency,
      duplicate: result.duplicate,
      consentRecorded: Boolean(consent),
      telegramVerified: Boolean(usable?.telegramId),
      paidAt: transaction.paid_at || null,
    })
  } catch (error) {
    console.error('[pay] paystack verify failed:', error)
    return NextResponse.json(
      { ok: false, error: 'Could not confirm the payment with Paystack. Contact us if you were charged.' },
      { status: 502 }
    )
  }
}
