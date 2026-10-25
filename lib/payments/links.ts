/**
 * Canonical payment links — importable from server components AND client
 * components (NEXT_PUBLIC_* is inlined at build time). One place to change.
 */

/** Landing checkout: Paystack + USDT/USDC + bank, records server-side consent. */
export const PAY_PAGE_PATH = '/pay'

/**
 * Standalone Paystack storefront links were REMOVED (2026-10-24). A hosted shop
 * page cannot show the pre-payment disclosures or create the server-side consent
 * record that `/pay` requires, so linking to it would bypass the consent gate.
 * Checkout lives only at `/pay`.
 */

/** Free public channel — the waitlist. */
export const TELEGRAM_CHANNEL_URL = 'https://t.me/l2signals'

/** Support handle for manual payment questions. */
export const TELEGRAM_SUPPORT_URL = 'https://t.me/aotayoL2'

/**
 * Where a payer sends proof of payment. Online payments are verified against
 * Paystack; crypto and bank transfers are checked manually, and the operator
 * adds the member personally. This is the one link that turns a manual payment
 * into access. Override with NEXT_PUBLIC_TELEGRAM_PROOF_URL if the account ever
 * changes.
 *
 * @aotayoL2 is the support/business account; @aotayo is the founder's personal
 * account and stays as a fallback in the FAQ copy.
 */
export const TELEGRAM_PROOF_URL = (
  process.env.NEXT_PUBLIC_TELEGRAM_PROOF_URL || 'https://t.me/aotayoL2'
).trim()

/** Display handle derived from the URL, e.g. `@aotayoL2`. */
export const TELEGRAM_PROOF_HANDLE =
  TELEGRAM_PROOF_URL.replace(/^https?:\/\/(www\.)?t\.me\//i, '@').replace(/\/$/, '') || '@aotayoL2'

/**
 * Email proof channel — for payers without Telegram, or anyone who would rather
 * email. Same manual review, and the invite can be sent back by email.
 */
export const PROOF_EMAIL = (process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'l2signalslab@gmail.com').trim()
