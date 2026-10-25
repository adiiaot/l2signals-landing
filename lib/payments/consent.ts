import { createHash, randomBytes } from 'node:crypto'
import { Timestamp } from 'firebase-admin/firestore'
import { getAdminDb } from '@/lib/firebase-admin'
import {
  requiredConsentSlugs,
  requiredConsentVersions,
  validateConsentVersions,
} from '@/data/legal'
import { OFFER } from '@/data/business'
import type { PaymentsConfig } from './types'
import { normalizeEmail } from './validate'

/**
 * Payment consent records.
 *
 * A payer must accept the current legal documents BEFORE a payment can be
 * initiated. The browser sends only the document versions it displayed; the
 * server recomputes the required set from `data/legal.ts`, writes an immutable
 * snapshot and returns an id. The payment routes consume that id exactly once.
 *
 * This is deliberately server-authoritative:
 *  - a browser cannot invent a consent id,
 *  - a browser cannot claim an older version is current,
 *  - a tampered checkbox state is irrelevant because the signature is verified
 *    against the expected versions, not against a boolean flag.
 *
 * The record contains no card data, no secret and no raw IP address (only a
 * salted hash for abuse investigation).
 */

const CONSENTS = 'payConsents'
const CONSENT_TTL_MS = 24 * 60 * 60 * 1000
const CONSENT_ID_RE = /^consent_[a-f0-9]{16,64}$/i

export type ConsentMode = 'init' | 'submit'

export type ConsentStatus = 'pending' | 'initiated' | 'submitted' | 'paid'

export interface ConsentRecord {
  id: string
  email: string
  productId: string
  productName: string
  plan: { ngn: number; usd: number; days: number }
  accepted: Record<string, string>
  foundingApplicable: boolean
  status: ConsentStatus
  createdAt: Timestamp | null
  expiresAt: Timestamp | null
  consumedAt: Timestamp | null
  paystackReference: string
  paymentId: string
}

export type ConsentFailureCode = 'invalid' | 'expired' | 'used' | 'mismatch' | 'unavailable' | 'plan_changed'

export type ConsentResult<T> =
  | ({ ok: true } & T)
  | { ok: false; code: ConsentFailureCode; error: string; missing?: string[]; mismatched?: string[] }

function toConsent(id: string, data: Record<string, unknown>): ConsentRecord {
  return {
    id,
    email: String(data.email || ''),
    productId: String(data.productId || ''),
    productName: String(data.productName || ''),
    plan: {
      ngn: Number((data.plan as Record<string, unknown> | undefined)?.ngn || 0),
      usd: Number((data.plan as Record<string, unknown> | undefined)?.usd || 0),
      days: Number((data.plan as Record<string, unknown> | undefined)?.days || 0),
    },
    accepted:
      data.accepted && typeof data.accepted === 'object' && !Array.isArray(data.accepted)
        ? (data.accepted as Record<string, string>)
        : {},
    foundingApplicable: Boolean(data.foundingApplicable),
    status: (data.status as ConsentStatus) || 'pending',
    createdAt: (data.createdAt as Timestamp) || null,
    expiresAt: (data.expiresAt as Timestamp) || null,
    consumedAt: (data.consumedAt as Timestamp) || null,
    paystackReference: String(data.paystackReference || ''),
    paymentId: String(data.paymentId || ''),
  }
}

function requestHash(ipKey: string): string {
  const salt = (process.env.CONSENT_HASH_SALT || 'l2-signals-consent-v1').trim()
  return createHash('sha256').update(`${ipKey}|${salt}`, 'utf8').digest('hex')
}

function usable(record: ConsentRecord): ConsentResult<{ record: ConsentRecord }> {
  if (!record.expiresAt || record.expiresAt.toMillis() <= Date.now()) {
    return { ok: false, code: 'expired', error: 'This consent has expired. Please review and accept the documents again.' }
  }
  if (record.foundingApplicable !== OFFER.foundingApplicable) {
    return {
      ok: false,
      code: 'mismatch',
      error: 'The offer changed while you were checking out. Please review the current terms and accept them again.',
    }
  }
  const check = validateConsentVersions(record.accepted, OFFER.foundingApplicable)
  if (!check.ok) {
    return {
      ok: false,
      code: 'mismatch',
      error: 'The legal documents have changed since this consent was recorded. Please review and accept them again.',
      missing: check.missing,
      mismatched: check.mismatched,
    }
  }
  return { ok: true, record }
}

export async function createConsent(input: {
  email: string
  accepted: unknown
  plan: PaymentsConfig['plan']
  productId: string
  productName: string
  foundingApplicable: boolean
  ipKey: string
  userAgent: string
}): Promise<ConsentResult<{ consentId: string; accepted: Record<string, string>; expiresAt: string }>> {
  const email = normalizeEmail(input.email)
  if (!email) return { ok: false, code: 'invalid', error: 'Enter a valid email address.' }

  // Rebuild the accepted map from the expected set — never persist arbitrary
  // keys supplied by the browser.
  const check = validateConsentVersions(input.accepted, input.foundingApplicable)
  if (!check.ok) {
    return {
      ok: false,
      code: 'mismatch',
      error: 'All required documents must be accepted at their current version before payment.',
      missing: check.missing,
      mismatched: check.mismatched,
    }
  }

  const accepted: Record<string, string> = {}
  for (const slug of requiredConsentSlugs(input.foundingApplicable)) {
    accepted[slug] = requiredConsentVersions(input.foundingApplicable)[slug]
  }

  const db = getAdminDb()
  const consentId = `consent_${randomBytes(16).toString('hex')}`
  const now = Timestamp.now()
  const expiresAt = Timestamp.fromMillis(now.toMillis() + CONSENT_TTL_MS)

  try {
    await db.collection(CONSENTS).doc(consentId).set({
      email,
      productId: input.productId,
      productName: input.productName,
      plan: {
        ngn: input.plan.ngn,
        usd: input.plan.usd,
        days: input.plan.days,
      },
      accepted,
      foundingApplicable: input.foundingApplicable,
      status: 'pending',
      createdAt: now,
      expiresAt,
      consumedAt: null,
      paystackReference: '',
      paymentId: '',
      ipHash: requestHash(input.ipKey),
      userAgent: input.userAgent.slice(0, 200),
      source: 'landing/pay',
    })

    return {
      ok: true,
      consentId,
      accepted,
      expiresAt: expiresAt.toDate().toISOString(),
    }
  } catch (error) {
    console.error('[consent] create failed:', error)
    return {
      ok: false,
      code: 'unavailable',
      error: 'Could not record your consent. Payment cannot start without it. Please try again.',
    }
  }
}

export async function getConsent(id: string): Promise<ConsentRecord | null> {
  if (!CONSENT_ID_RE.test(id)) return null
  const snap = await getAdminDb().collection(CONSENTS).doc(id).get()
  if (!snap.exists) return null
  return toConsent(snap.id, snap.data() as Record<string, unknown>)
}

/**
 * Resolve the consent referenced by Paystack transaction metadata and check that
 * it belongs to this exact charge. Used by both the redirect verifier and the
 * webhook so the two paths can never disagree about consent.
 */
export async function resolvePaystackConsent(input: {
  consentId: string
  reference: string
  customerEmail?: string
}): Promise<{ consent: ConsentRecord | null; issue: string }> {
  if (!input.consentId.trim()) {
    return { consent: null, issue: 'No consent record in transaction metadata' }
  }

  let consent: ConsentRecord | null
  try {
    consent = await getConsent(input.consentId.trim())
  } catch (error) {
    console.error('[consent] paystack lookup failed:', error)
    return { consent: null, issue: 'Consent lookup failed' }
  }

  if (!consent) {
    return { consent: null, issue: 'Consent record referenced by Paystack was not found' }
  }
  if (consent.paystackReference && consent.paystackReference !== input.reference) {
    return { consent: null, issue: 'Consent record is linked to a different Paystack reference' }
  }
  if (consent.status !== 'initiated' && consent.status !== 'paid') {
    return { consent: null, issue: `Consent record is in an unexpected state (${consent.status})` }
  }

  const customerEmail = normalizeEmail(input.customerEmail)
  if (customerEmail && consent.email !== customerEmail) {
    return { consent: null, issue: 'Consent email does not match the Paystack customer' }
  }

  return { consent, issue: '' }
}

/**
 * Atomically consume a consent record. A record can back exactly one payment
 * attempt, so a leaked consent id cannot be replayed for a second payment.
 */
export async function consumeConsent(input: {
  id: string
  email: string
  mode: ConsentMode
  /** Current server price. A consent taken at a different price must not be charged. */
  expectedPlan?: { ngn: number; usd: number; days: number }
}): Promise<ConsentResult<{ record: ConsentRecord }>> {
  if (!CONSENT_ID_RE.test(input.id)) {
    return { ok: false, code: 'invalid', error: 'Consent is required before payment. Please review and accept the documents.' }
  }

  const email = normalizeEmail(input.email)
  if (!email) return { ok: false, code: 'invalid', error: 'Enter a valid email address.' }

  const db = getAdminDb()
  const ref = db.collection(CONSENTS).doc(input.id)

  try {
    return await db.runTransaction(async (tx) => {
      const snap = await tx.get(ref)
      if (!snap.exists) {
        return { ok: false as const, code: 'invalid' as const, error: 'Consent record not found. Please accept the documents again.' }
      }

      const record = toConsent(snap.id, snap.data() as Record<string, unknown>)

      if (record.email !== email) {
        return {
          ok: false as const,
          code: 'mismatch' as const,
          error: 'The consent record does not match this email address. Please accept the documents again.',
        }
      }

      if (record.status !== 'pending') {
        return { ok: false as const, code: 'used' as const, error: 'This consent has already been used. Please accept the documents again.' }
      }

      const valid = usable(record)
      if (!valid.ok) return valid

      if (
        input.expectedPlan &&
        (record.plan.ngn !== input.expectedPlan.ngn ||
          record.plan.usd !== input.expectedPlan.usd ||
          record.plan.days !== input.expectedPlan.days)
      ) {
        return {
          ok: false as const,
          code: 'plan_changed' as const,
          error: 'The plan or price changed while you were checking out. Reload the page and review the current terms before paying.',
        }
      }

      tx.update(ref, {
        status: input.mode === 'init' ? 'initiated' : 'submitted',
        consumedAt: Timestamp.now(),
      })

      return {
        ok: true as const,
        record: {
          ...record,
          status: input.mode === 'init' ? ('initiated' as const) : ('submitted' as const),
        },
      }
    })
  } catch (error) {
    console.error('[consent] consume failed:', error)
    return {
      ok: false,
      code: 'unavailable',
      error: 'Could not verify your consent. Payment cannot start without it. Please try again.',
    }
  }
}

export async function attachConsentReference(consentId: string, reference: string): Promise<void> {
  if (!CONSENT_ID_RE.test(consentId)) return
  await getAdminDb().collection(CONSENTS).doc(consentId).update({
    paystackReference: reference,
  })
}

export async function attachConsentPayment(
  consentId: string,
  paymentId: string,
  reference: string,
  status: 'submitted' | 'paid' = 'paid'
): Promise<void> {
  if (!CONSENT_ID_RE.test(consentId)) return
  await getAdminDb().collection(CONSENTS).doc(consentId).update({
    paymentId,
    paystackReference: reference,
    status,
    ...(status === 'paid' ? { paidAt: Timestamp.now() } : { submittedAt: Timestamp.now() }),
  })
}
