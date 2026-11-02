import { NextResponse } from 'next/server'

/**
 * Public ledger proxy.
 *
 * The business site publishes the operator's execution record, but the private
 * application origin must not be exposed in the public bundle or in browser
 * network traffic. This route reads the ledger server-side and returns only the
 * trades, so the browser never talks to the private app.
 *
 * The origin is configuration, not a hardcoded default: set `L2_WEB_API_URL`
 * (server-side) or `NEXT_PUBLIC_L2_WEB_API` in the Vercel project.
 */
export const dynamic = 'force-dynamic'
export const revalidate = 0

const ALLOWED_ACCOUNTS = new Set(['demo', 'prop'])

function origin(): string | null {
  const raw = process.env.L2_WEB_API_URL || process.env.NEXT_PUBLIC_L2_WEB_API || ''
  const trimmed = raw.trim().replace(/\/$/, '')
  if (!trimmed) return null
  try {
    const url = new URL(trimmed)
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null
    return url.toString().replace(/\/$/, '')
  } catch {
    return null
  }
}

export async function GET(request: Request) {
  const account = new URL(request.url).searchParams.get('account') || 'demo'
  if (!ALLOWED_ACCOUNTS.has(account)) {
    return NextResponse.json({ success: false, error: 'unknown_account', trades: [] }, { status: 400 })
  }

  const base = origin()
  if (!base) {
    // No origin configured — report an empty record rather than inventing one.
    return NextResponse.json(
      { success: false, error: 'ledger_not_configured', trades: [] },
      { status: 503 }
    )
  }

  try {
    const res = await fetch(`${base}/api/trades?account=${account}&limit=200`, {
      cache: 'no-store',
      headers: { accept: 'application/json' },
      signal: AbortSignal.timeout(10_000),
    })
    if (!res.ok) {
      return NextResponse.json({ success: false, error: 'ledger_unavailable', trades: [] }, { status: 502 })
    }

    const json = (await res.json()) as { success?: boolean; trades?: unknown[] }
    const trades = Array.isArray(json?.trades) ? json.trades : []

    return NextResponse.json(
      { success: true, trades },
      { headers: { 'cache-control': 'no-store' } }
    )
  } catch {
    return NextResponse.json({ success: false, error: 'ledger_unavailable', trades: [] }, { status: 502 })
  }
}
