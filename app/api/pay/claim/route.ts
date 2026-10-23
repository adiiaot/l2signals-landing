import { NextRequest, NextResponse } from 'next/server'
import { hasAdminCredentials } from '@/lib/firebase-admin'
import { claimIsUsable, createClaim, findClaimByToken } from '@/lib/payments/claims'
import { clientKey, rateLimit } from '@/lib/payments/rate-limit'
import { looksLikeBot, normalizeEmail, str } from '@/lib/payments/validate'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const NOT_CONFIGURED = () =>
  NextResponse.json(
    { ok: false, error: 'Payments are not configured yet. Please contact us on Telegram.' },
    { status: 503 }
  )

/**
 * POST /api/pay/claim — start an identity link.
 * The browser gets a one-time token; the bot binds a Telegram ID to it via
 * https://t.me/<bot>?start=pay_<token>. Only the SHA-256 of the token is stored.
 */
export async function POST(req: NextRequest) {
  if (!hasAdminCredentials()) return NOT_CONFIGURED()

  const limited = rateLimit(clientKey(req, 'claim'), 10, 60_000)
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, error: 'Too many attempts. Wait a minute and try again.' },
      { status: 429, headers: { 'Retry-After': String(limited.retryAfterSeconds) } }
    )
  }

  const body = await req.json().catch(() => null)
  if (!body || looksLikeBot(body.company)) {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }

  const email = normalizeEmail(body.email)
  if (!email) return NextResponse.json({ ok: false, error: 'Enter a valid email address.' }, { status: 400 })

  const method = ['crypto', 'bank', 'paystack'].includes(str(body.method))
    ? (str(body.method) as 'crypto' | 'bank' | 'paystack')
    : null

  const botUrl = (process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL || '').trim()
  if (!botUrl) {
    return NextResponse.json(
      { ok: false, error: 'Telegram verification is not available right now.' },
      { status: 503 }
    )
  }

  try {
    const claim = await createClaim(email, method)
    return NextResponse.json({
      ok: true,
      token: claim.token,
      telegramUrl: `${botUrl}${botUrl.includes('?') ? '&' : '?'}start=pay_${claim.token}`,
    })
  } catch (error) {
    console.error('[pay] claim create failed:', error)
    return NextResponse.json({ ok: false, error: 'Could not start verification.' }, { status: 500 })
  }
}

/** GET /api/pay/claim?token=… — the page polls this after the user returns from Telegram. */
export async function GET(req: NextRequest) {
  if (!hasAdminCredentials()) return NOT_CONFIGURED()

  const limited = rateLimit(clientKey(req, 'claim-poll'), 90, 60_000)
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, error: 'Slow down.' },
      { status: 429, headers: { 'Retry-After': String(limited.retryAfterSeconds) } }
    )
  }

  const token = str(new URL(req.url).searchParams.get('token'), 80)
  if (!token) return NextResponse.json({ ok: false, error: 'Missing token.' }, { status: 400 })

  try {
    const claim = await findClaimByToken(token)
    if (!claim) return NextResponse.json({ ok: true, verified: false, expired: true })

    return NextResponse.json({
      ok: true,
      verified: claim.telegramVerified && Boolean(claim.telegramId),
      username: claim.telegramUsername || '',
      expired: !claimIsUsable(claim),
    })
  } catch (error) {
    console.error('[pay] claim lookup failed:', error)
    return NextResponse.json({ ok: false, error: 'Lookup failed.' }, { status: 500 })
  }
}
