import { createHash, randomBytes } from 'node:crypto'
import { Timestamp } from 'firebase-admin/firestore'
import { getAdminDb } from '@/lib/firebase-admin'
import { PaymentNetwork } from './types'

/**
 * Payment claims + the one-payment-one-membership guard.
 *
 * Two different attacks are covered:
 *  - impersonation → the claim is bound to a Telegram ID by the bot deep link
 *    (optional: without it the claim falls back to the payer's email)
 *  - double-claiming → `txIndex/{provider}:{reference}` is create-if-absent, so the
 *    same hash / Paystack reference can never back two memberships.
 */

const CLAIMS = 'payClaims'
const PAYMENTS = 'payments'
const INDEX = 'txIndex'

const CLAIM_TTL_MS = 24 * 60 * 60 * 1000

// Telegram caps a /start payload at 64 characters, and the token travels as
// `pay_<token>` — 24 bytes (48 hex chars) leaves room and is still unguessable.
const TOKEN_BYTES = 24
const TOKEN_HEX = TOKEN_BYTES * 2

export type PaymentMethod = 'crypto' | 'bank' | 'paystack'

export interface ClaimSnapshot {
  id: string
  email: string
  telegramId: number | null
  telegramUsername: string
  telegramVerified: boolean
  method: PaymentMethod | null
  status: 'open' | 'submitted'
  createdAt: Timestamp | null
  expiresAt: Timestamp | null
}

function hashToken(token: string): string {
  return createHash('sha256').update(token, 'utf8').digest('hex')
}

function toClaim(id: string, data: Record<string, unknown>): ClaimSnapshot {
  return {
    id,
    email: String(data.email || ''),
    telegramId: typeof data.telegramId === 'number' ? data.telegramId : null,
    telegramUsername: String(data.telegramUsername || ''),
    telegramVerified: Boolean(data.telegramVerified),
    method: (data.method as PaymentMethod) || null,
    status: (data.status as 'open' | 'submitted') || 'open',
    createdAt: (data.createdAt as Timestamp) || null,
    expiresAt: (data.expiresAt as Timestamp) || null,
  }
}

export async function createClaim(email: string, method: PaymentMethod | null): Promise<{ id: string; token: string }> {
  const db = getAdminDb()
  const id = `claim_${randomBytes(8).toString('hex')}`
  const token = randomBytes(TOKEN_BYTES).toString('hex')
  const now = Timestamp.now()

  await db.collection(CLAIMS).doc(id).set({
    tokenHash: hashToken(token),
    email,
    method,
    status: 'open',
    telegramId: null,
    telegramUsername: '',
    telegramVerified: false,
    paystackReference: '',
    createdAt: now,
    expiresAt: Timestamp.fromMillis(now.toMillis() + CLAIM_TTL_MS),
    ip: '',
  })

  return { id, token }
}

export async function findClaimByToken(token: string): Promise<ClaimSnapshot | null> {
  const value = token.trim()
  if (!new RegExp(`^[0-9a-f]{${TOKEN_HEX}}$`, 'i').test(value)) return null

  const db = getAdminDb()
  const snap = await db.collection(CLAIMS).where('tokenHash', '==', hashToken(value)).limit(1).get()
  if (snap.empty) return null

  const doc = snap.docs[0]
  return toClaim(doc.id, doc.data())
}

export async function findClaimByPaystackReference(reference: string): Promise<ClaimSnapshot | null> {
  const db = getAdminDb()
  const snap = await db.collection(CLAIMS).where('paystackReference', '==', reference).limit(1).get()
  if (snap.empty) return null
  const doc = snap.docs[0]
  return toClaim(doc.id, doc.data())
}

/** Fallback when the Paystack metadata carries the claim id but the reference was never attached. */
export async function findClaimById(id: string): Promise<ClaimSnapshot | null> {
  if (!id || !/^claim_[a-z0-9]{8,40}$/i.test(id)) return null
  const snap = await getAdminDb().collection(CLAIMS).doc(id).get()
  if (!snap.exists) return null
  return toClaim(snap.id, snap.data() as Record<string, unknown>)
}

export async function attachPaystackReference(claimId: string, reference: string) {
  const db = getAdminDb()
  await db.collection(CLAIMS).doc(claimId).update({ paystackReference: reference })
}

export async function markClaimSubmitted(claimId: string) {
  const db = getAdminDb()
  await db.collection(CLAIMS).doc(claimId).update({ status: 'submitted' })
}

/** A claim is trustworthy only while it is unexpired and still unspent. */
export function claimIsUsable(claim: ClaimSnapshot | null): boolean {
  if (!claim) return false
  if (claim.status !== 'open') return false
  if (!claim.expiresAt) return false
  return claim.expiresAt.toMillis() > Date.now()
}

export interface RecordPaymentInput {
  email: string
  method: PaymentMethod
  provider: 'manual' | 'paystack'
  amount: number
  currency: 'NGN' | 'USD'
  /** Chain hash for crypto, bank narration/ref for bank, Paystack reference for card. */
  reference: string
  network?: PaymentNetwork | null
  claim?: ClaimSnapshot | null
  adminNotes?: string
  /** Paystack webhook + verify can both fire for one charge — replay must be a no-op. */
  idempotent?: boolean
}

export type RecordResult =
  | { ok: true; paymentId: string; duplicate: boolean }
  | { ok: false; code: 'duplicate' | 'error'; error: string }

class DuplicateReference extends Error {
  existingPaymentId: string
  constructor(existingPaymentId: string) {
    super('duplicate')
    this.existingPaymentId = existingPaymentId
  }
}

function indexKey(provider: string, reference: string): string {
  const safe = `${provider}:${reference}`.toLowerCase().replace(/[^a-z0-9:_-]/g, '').slice(0, 400)
  return safe || 'unknown'
}

export async function recordPayment(input: RecordPaymentInput): Promise<RecordResult> {
  const db = getAdminDb()
  const paymentId = `pay_${randomBytes(6).toString('hex')}`
  const reference = input.reference.trim()
  const claim = input.claim
  const telegramId = claim?.telegramId ?? null
  const now = Timestamp.now()

  const paymentRef = db.collection(PAYMENTS).doc(paymentId)
  const indexRef = db.collection(INDEX).doc(indexKey(input.provider, reference))

  try {
    await db.runTransaction(async (tx) => {
      const existing = await tx.get(indexRef)
      if (existing.exists) {
        const data = existing.data() as { paymentId?: string }
        throw new DuplicateReference(data?.paymentId || '')
      }

      tx.set(indexRef, {
        paymentId,
        provider: input.provider,
        reference,
        method: input.method,
        telegramId,
        email: input.email,
        createdAt: now,
      })

      tx.set(paymentRef, {
        telegramId,
        username: claim?.telegramUsername || '',
        email: input.email,
        amount: input.amount,
        currency: input.currency,
        plan: 'signals_group',
        method: input.method,
        provider: input.provider,
        network: input.network || '',
        txHash: input.method === 'crypto' ? reference : '',
        reference,
        screenshotUrl: '',
        source: 'landing',
        status: 'pending',
        telegramVerified: Boolean(telegramId),
        claimId: claim?.id || '',
        adminNotes: input.adminNotes || '',
        createdAt: now,
      })
    })

    return { ok: true, paymentId, duplicate: false }
  } catch (error) {
    if (error instanceof DuplicateReference) {
      if (input.idempotent && error.existingPaymentId) {
        return { ok: true, paymentId: error.existingPaymentId, duplicate: true }
      }
      return {
        ok: false,
        code: 'duplicate',
        error: 'That transaction reference has already been submitted. One payment, one membership.',
      }
    }

    console.error('[pay] recordPayment failed:', error)
    return { ok: false, code: 'error', error: 'Could not save the payment. Please try again.' }
  }
}
