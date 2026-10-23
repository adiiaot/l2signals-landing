/**
 * Canonical payment links — importable from server components AND client
 * components (NEXT_PUBLIC_* is inlined at build time). One place to change.
 */

/** Landing checkout: card + USDT/USDC + bank, records a claim. Preferred. */
export const PAY_PAGE_PATH = '/pay'

/**
 * Standalone Paystack storefront. Works with zero setup (no secret key, no
 * Firestore) but captures no identity and no claim — a FALLBACK card rail for
 * when `/pay` is unavailable or the redirect fails. Card payments taken here
 * must be matched manually by email/reference.
 */
export const PAYSTACK_STOREFRONT_URL = (
  process.env.NEXT_PUBLIC_PAYSTACK_STOREFRONT_URL || 'https://paystack.shop/pay/l2signals-pro'
).trim()

/** Free public channel — the waitlist. */
export const TELEGRAM_CHANNEL_URL = 'https://t.me/l2signals'

/** Support handle for manual payment questions. */
export const TELEGRAM_SUPPORT_URL = 'https://t.me/l2signals'

/**
 * Where a payer sends proof of payment. Verification is manual: the operator
 * checks the reference/hash and adds the member personally, so this is the one
 * link that turns a payment into access. Override with
 * NEXT_PUBLIC_TELEGRAM_PROOF_URL if the account ever changes.
 */
export const TELEGRAM_PROOF_URL = (
  process.env.NEXT_PUBLIC_TELEGRAM_PROOF_URL || 'https://t.me/aot_ayo'
).trim()

/** Display handle derived from the URL, e.g. `@aot_ayo`. */
export const TELEGRAM_PROOF_HANDLE =
  TELEGRAM_PROOF_URL.replace(/^https?:\/\/(www\.)?t\.me\//i, '@').replace(/\/$/, '') || '@aot_ayo'

/**
 * Email proof channel — for payers without Telegram, or anyone who would rather
 * email. Same manual review, and the invite can be sent back by email.
 */
export const PROOF_EMAIL = (process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'l2signalslab@gmail.com').trim()
