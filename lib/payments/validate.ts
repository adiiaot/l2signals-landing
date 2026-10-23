export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function normalizeEmail(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const email = value.trim().toLowerCase()
  if (email.length < 5 || email.length > 160) return null
  return EMAIL_RE.test(email) ? email : null
}

/** Honeypot: real users never fill a field that is visually hidden. */
export function looksLikeBot(honeypot: unknown): boolean {
  return typeof honeypot === 'string' && honeypot.trim().length > 0
}

export function str(value: unknown, max = 400): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}
