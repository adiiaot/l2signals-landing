/**
 * Legal document registry — versions, effective dates and consent mapping.
 *
 * One document can appear in several places in the site, but it must have ONE
 * version here. The `/pay` consent record stores the exact versions the payer
 * accepted; the payment routes re-check them server-side, so editing a version
 * here invalidates old browser state instead of silently grandfathering it.
 *
 * Bump a document's version whenever its meaning changes. Changing only typos
 * does not require a bump.
 */

export const LEGAL_EFFECTIVE = '25 October 2026'
export const LEGAL_VERSION = '2026.10.3'
export const LEGAL_LAST_REVIEWED = '25 October 2026'

export type LegalCategory = 'core' | 'trading' | 'subscription' | 'programme'

export interface LegalDoc {
  /** Stable key used by consent records and PolicyShell lookups. */
  slug: string
  title: string
  short: string
  category: LegalCategory
  version: string
  effective: string
  status: 'published' | 'draft'
  href?: string
  pdf?: string
}

export const LEGAL_CATEGORIES: Record<LegalCategory, { label: string; description: string }> = {
  core: { label: 'Core terms', description: 'The contract between you and L2 Signals Services, and how personal data is handled.' },
  trading: { label: 'Trading & acceptable use', description: 'The risks of trading, and the rules for using the service and its private content.' },
  subscription: { label: 'Subscription, billing & measurement', description: 'What you buy, what it costs, how access and refunds work, and how performance is measured.' },
  programme: { label: 'Founding Members Programme', description: 'The limited early-access cohort and its one-time performance-based extension.' },
}

const published = (doc: Omit<LegalDoc, 'version' | 'effective' | 'status'>): LegalDoc => ({
  ...doc,
  version: LEGAL_VERSION,
  effective: LEGAL_EFFECTIVE,
  status: 'published',
})

export const LEGAL_DOCS: LegalDoc[] = [
  published({
    slug: 'terms',
    title: 'Terms of Service',
    short: 'The agreement governing the website, products, subscriptions and permitted use.',
    category: 'core',
    href: '/terms',
  }),
  published({
    slug: 'privacy',
    title: 'Privacy Policy',
    short: 'What data is collected, why, who processes it, how long it is kept and your rights.',
    category: 'core',
    href: '/privacy',
  }),
  published({
    slug: 'trading-risk-disclosure',
    title: 'Trading Risk Disclosure',
    short: 'The principal risks of trading gold, CFDs and leveraged instruments, and what is not guaranteed.',
    category: 'trading',
    href: '/policies/trading-risk-disclosure',
  }),
  published({
    slug: 'acceptable-use',
    title: 'Acceptable Use Policy',
    short: 'The rules on sharing, resale, redistribution, access control and abuse of the service.',
    category: 'trading',
    href: '/policies/acceptable-use',
  }),
  published({
    slug: 'signal-access-and-delivery',
    title: 'Signal Access & Delivery Policy',
    short: 'Order types, entries, the daily 21:00 UTC cutoff, position sizing and execution rules.',
    category: 'trading',
    href: '/policies/signal-access-and-delivery',
  }),
  published({
    slug: 'subscription-terms',
    title: 'Subscription Terms & Conditions',
    short: 'Plans and pricing, payment methods, activation, renewal, cancellation and refunds.',
    category: 'subscription',
    href: '/policies/subscription-terms',
  }),
  published({
    slug: 'refunds-and-cancellations',
    title: 'Refunds & Cancellations',
    short: 'How to cancel, when access ends, duplicate payments and the refund position.',
    category: 'subscription',
    href: '/policies/refunds-and-cancellations',
  }),
  published({
    slug: 'performance-measurement',
    title: 'Performance Measurement Policy',
    short: 'How official Net R is recorded, calculated, finalised and reported.',
    category: 'subscription',
    href: '/policies/performance-measurement',
  }),
  published({
    slug: 'founding-members-programme',
    title: 'Founding Members Programme',
    short: 'The early-access cohort — 50 members, pricing and the one-time extension.',
    category: 'programme',
    href: '/policies/founding-members-programme',
  }),
  published({
    slug: 'founding-member-extension',
    title: 'Founding Member Extension Policy',
    short: 'The one-time additional month when official net R for the starting calendar month is zero or below.',
    category: 'programme',
    href: '/policies/founding-member-extension',
  }),
]

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return LEGAL_DOCS.find((doc) => doc.slug === slug)
}

export function legalVersion(slug: string): string {
  return getLegalDoc(slug)?.version || LEGAL_VERSION
}

export function docsByCategory(category: LegalCategory): LegalDoc[] {
  return LEGAL_DOCS.filter((doc) => doc.category === category)
}

/**
 * Documents a payer must have been shown and accepted before a payment may be
 * initiated. `founding-members-programme` is added only when the offer the payer
 * is buying is the founding offer (see `OFFER.foundingApplicable`).
 */
export const REQUIRED_CONSENT_SLUGS = [
  'terms',
  'subscription-terms',
  'trading-risk-disclosure',
  'privacy',
  'performance-measurement',
] as const

export const FOUNDING_CONSENT_SLUG = 'founding-members-programme' as const

export type RequiredConsentSlug = (typeof REQUIRED_CONSENT_SLUGS)[number] | typeof FOUNDING_CONSENT_SLUG

export function requiredConsentSlugs(foundingApplicable: boolean): RequiredConsentSlug[] {
  return foundingApplicable
    ? [...REQUIRED_CONSENT_SLUGS, FOUNDING_CONSENT_SLUG]
    : [...REQUIRED_CONSENT_SLUGS]
}

/** The exact `{ slug: version }` set a valid consent record must contain. */
export function requiredConsentVersions(foundingApplicable: boolean): Record<string, string> {
  return Object.fromEntries(requiredConsentSlugs(foundingApplicable).map((slug) => [slug, legalVersion(slug)]))
}

export interface ConsentVersionCheck {
  ok: boolean
  missing: string[]
  mismatched: string[]
  unexpected: string[]
}

/**
 * Pure, server-safe check used by `/api/pay/consent` and re-used by the payment
 * routes. A browser may send anything; only the exact current versions pass.
 */
export function validateConsentVersions(
  accepted: unknown,
  foundingApplicable: boolean
): ConsentVersionCheck {
  const expected = requiredConsentVersions(foundingApplicable)
  const actual =
    accepted && typeof accepted === 'object' && !Array.isArray(accepted)
      ? (accepted as Record<string, unknown>)
      : {}

  const missing: string[] = []
  const mismatched: string[] = []

  for (const [slug, version] of Object.entries(expected)) {
    const value = actual[slug]
    if (typeof value !== 'string' || !value.trim()) missing.push(slug)
    else if (value !== version) mismatched.push(slug)
  }

  const unexpected = Object.keys(actual).filter((slug) => !(slug in expected))

  return { ok: missing.length === 0 && mismatched.length === 0, missing, mismatched, unexpected }
}
