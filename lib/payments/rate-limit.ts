/**
 * Best-effort in-memory rate limit for the public payment routes.
 *
 * Serverless instances are ephemeral, so this is a speed bump, not a wall — it stops
 * a script hammering one warm instance. The durable protections are the txIndex
 * (one payment, one membership) and manual review.
 */

interface Bucket {
  count: number
  resetAt: number
}

const buckets = new Map<string, Bucket>()

export interface RateLimitResult {
  ok: boolean
  retryAfterSeconds: number
}

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now()
  const existing = buckets.get(key)

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    if (buckets.size > 5000) {
      for (const [k, v] of buckets) if (v.resetAt <= now) buckets.delete(k)
    }
    return { ok: true, retryAfterSeconds: 0 }
  }

  existing.count += 1
  if (existing.count > limit) {
    return { ok: false, retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000) }
  }

  return { ok: true, retryAfterSeconds: 0 }
}

/** Vercel sets x-forwarded-for; fall back to a constant so the limit still applies. */
export function clientKey(req: Request, scope: string): string {
  const forwarded = req.headers.get('x-forwarded-for') || ''
  const ip = forwarded.split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown'
  return `${scope}:${ip}`
}
