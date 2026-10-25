/**
 * Pure consent-registry check — no Firebase, no network.
 *
 * Run with: npx tsx scripts/check-consent.ts
 *
 * It proves the contract between what `/pay` sends and what `/api/pay/consent`
 * accepts:
 *  - every consent slug maps to a published document at the registry version
 *  - a complete map passes
 *  - a missing or stale version fails
 *  - the founding document is required only while the founding offer applies
 */
import {
  LEGAL_DOCS,
  LEGAL_VERSION,
  requiredConsentSlugs,
  requiredConsentVersions,
  validateConsentVersions,
} from '../data/legal'

let failures = 0

function check(condition: boolean, message: string) {
  if (condition) {
    console.log(`ok   ${message}`)
  } else {
    failures += 1
    console.error(`FAIL ${message}`)
  }
}

for (const foundingApplicable of [true, false]) {
  const label = foundingApplicable ? 'founding offer' : 'standard offer'
  const slugs = requiredConsentSlugs(foundingApplicable)
  const required = requiredConsentVersions(foundingApplicable)

  check(
    Object.keys(required).length === (foundingApplicable ? 6 : 5),
    `${label}: expected ${foundingApplicable ? 6 : 5} consent documents, got ${Object.keys(required).length}`
  )

  for (const slug of slugs) {
    const doc = LEGAL_DOCS.find((item) => item.slug === slug)
    check(Boolean(doc), `${label}: "${slug}" exists in the legal registry`)
    check(doc?.status === 'published', `${label}: "${slug}" is published`)
    check(doc?.version === required[slug], `${label}: "${slug}" registry version matches the consent version`)
    check(
      required[slug] === LEGAL_VERSION,
      `${label}: "${slug}" is at the current site version ${LEGAL_VERSION}`
    )
  }

  const complete = validateConsentVersions(required, foundingApplicable)
  check(complete.ok, `${label}: a complete current-version map passes`)

  const missing = { ...required }
  delete missing['trading-risk-disclosure']
  const missingCheck = validateConsentVersions(missing, foundingApplicable)
  check(
    !missingCheck.ok && missingCheck.missing.includes('trading-risk-disclosure'),
    `${label}: a missing risk acceptance fails`
  )

  const stale = { ...required, terms: '2026.01.0' }
  const staleCheck = validateConsentVersions(stale, foundingApplicable)
  check(
    !staleCheck.ok && staleCheck.mismatched.includes('terms'),
    `${label}: a stale terms version fails`
  )

  if (foundingApplicable) {
    const noFounding = { ...required }
    delete noFounding['founding-members-programme']
    check(
      !validateConsentVersions(noFounding, true).ok,
      'founding offer: the founding document cannot be omitted'
    )
    check(
      validateConsentVersions(noFounding, false).ok,
      'standard offer: the founding document is not required'
    )
  }
}

if (failures > 0) {
  console.error(`\n${failures} consent check(s) failed.`)
  process.exit(1)
}

console.log('\nAll consent checks passed.')
