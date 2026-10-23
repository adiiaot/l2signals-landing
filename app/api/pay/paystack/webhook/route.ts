import { NextRequest, NextResponse } from 'next/server'
import { hasAdminCredentials } from '@/lib/firebase-admin'
import {
  claimIsUsable,
  findClaimById,
  findClaimByPaystackReference,
  markClaimSubmitted,
  recordPayment,
} from '@/lib/payments/claims'
import { getPaymentsConfig } from '@/lib/payments/config'
import { isValidWebhookSignature, verifyTransaction } from '@/lib/payments/paystack'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * POST /api/pay/paystack/webhook — authoritative confirmation.
 *
 * Configure this URL on the Paystack dashboard. Signature is HMAC-SHA512 of the RAW
 * body, so the body is read as text and never re-serialised. The charge is then
 * re-verified against the API: the webhook proves a charge happened, verifying proves
 * it is the charge we expected.
 */
export async function POST(req: NextRequest) {
  if (!hasAdminCredentials()) {
    // 503 (not 200) so Paystack keeps retrying: if the service account is added
    // within their retry window, the charge still gets recorded.
    console.error('[pay] paystack webhook: Firebase Admin credentials missing')
    return NextResponse.json({ ok: false, error: 'Not configured' }, { status: 503 })
  }

  const raw = await req.text()
  const signature = req.headers.get('x-paystack-signature')
  if (!isValidWebhookSignature(raw, signature)) {
    console.warn('[pay] paystack webhook: bad signature')
    return NextResponse.json({ ok: false, error: 'Invalid signature' }, { status: 401 })
  }

  let event: { event?: string; data?: { reference?: string } }
  try {
    event = JSON.parse(raw)
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  if (event?.event !== 'charge.success') {
    return NextResponse.json({ ok: true, ignored: event?.event || 'unknown' })
  }

  const reference = event.data?.reference
  if (!reference) return NextResponse.json({ ok: true, ignored: 'no-reference' })

  try {
    const transaction = await verifyTransaction(reference)
    if (transaction.status !== 'success') {
      return NextResponse.json({ ok: true, ignored: `status:${transaction.status}` })
    }

    const config = await getPaymentsConfig()
    const currency = transaction.currency === 'USD' ? 'USD' : 'NGN'
    const expected = currency === 'USD' ? config.plan.usd : config.plan.ngn
    const paid = transaction.amount / 100

    const metadata = transaction.metadata as { claimId?: string } | null | undefined
    let claim = await findClaimByPaystackReference(reference)
    if (!claim && metadata?.claimId) claim = await findClaimById(metadata.claimId)
    const usable = claim && claimIsUsable(claim) ? claim : null

    const adminNotes =
      paid + 0.01 < expected
        ? `Amount mismatch — paid ${currency} ${paid.toFixed(2)}, expected ${currency} ${expected.toFixed(2)}`
        : ''

    const result = await recordPayment({
      email: usable?.email || transaction.customer?.email || '',
      method: 'paystack',
      provider: 'paystack',
      amount: paid,
      currency,
      reference,
      claim: usable,
      adminNotes,
      idempotent: true,
    })

    if (!result.ok) {
      // Return 500 so Paystack retries — a lost charge notification is worse than a retry.
      console.error('[pay] webhook could not record payment:', result.error)
      return NextResponse.json({ ok: false, error: result.error }, { status: 500 })
    }

    if (usable) await markClaimSubmitted(usable.id).catch(() => undefined)

    return NextResponse.json({ ok: true, paymentId: result.paymentId, duplicate: result.duplicate })
  } catch (error) {
    console.error('[pay] webhook processing failed:', error)
    return NextResponse.json({ ok: false, error: 'Processing failed' }, { status: 500 })
  }
}
