import { LEGAL_DOCS, LEGAL_VERSION, LEGAL_EFFECTIVE } from './legal'

/**
 * Backwards-compatible policy list used by the existing `/policies/*` pages and
 * `PolicyShell`. The authoritative metadata (versions, effective dates, consent
 * mapping) lives in `data/legal.ts` — do not duplicate it here.
 */
export interface PolicyDoc {
  slug: string
  title: string
  short: string
  pdf?: string
  version: string
  effective: string
}

export const POLICIES: PolicyDoc[] = LEGAL_DOCS.filter(
  // `/terms` and `/privacy` are core website documents, not member-policy pages.
  (doc) => doc.category !== 'core'
).map((doc) => ({
  slug: doc.slug,
  title: doc.title,
  short: doc.short,
  pdf: doc.pdf,
  version: doc.version,
  effective: doc.effective,
}))

export const POLICY_TAGLINE = 'Systematic Trading. Measured Performance. Structured Execution.'

export const POLICY_VERSION = LEGAL_VERSION
export const POLICY_EFFECTIVE = LEGAL_EFFECTIVE
