import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'

/**
 * Paystack server helpers. Server-only — the secret key must never reach the client.
 * We use the hosted checkout (redirect), so no public key or inline JS is needed.
 */

const BASE = 'https://api.paystack.co'

export type PaystackCurrency = 'NGN' | 'USD'

export function paystackCurrency(): PaystackCurrency {
  return process.env.PAYSTACK_USD_ENABLED === 'true' ? 'USD' : 'NGN'
}

export function newReference(): string {
  return `l2_${Date.now().toString(36)}_${randomBytes(6).toString('hex')}`
}

interface PaystackApiResponse<T> {
  status: boolean
  message: string
  data: T
}

async function paystackFetch<T>(path: string, init: RequestInit): Promise<T> {
  const secret = (process.env.PAYSTACK_SECRET_KEY || '').trim()
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${secret}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
    signal: AbortSignal.timeout(15000),
    cache: 'no-store',
  })

  const json = (await res.json().catch(() => null)) as PaystackApiResponse<T> | null

  if (!res.ok || !json?.status) {
    throw new Error(json?.message || `Paystack request failed (${res.status})`)
  }

  return json.data
}

export interface InitializedTransaction {
  authorization_url: string
  access_code: string
  reference: string
}

export async function initializeTransaction(input: {
  email: string
  amountMinor: number
  currency: PaystackCurrency
  reference: string
  callbackUrl: string
  metadata?: Record<string, unknown>
}): Promise<InitializedTransaction> {
  return paystackFetch<InitializedTransaction>('/transaction/initialize', {
    method: 'POST',
    body: JSON.stringify({
      email: input.email,
      amount: input.amountMinor,
      currency: input.currency,
      reference: input.reference,
      callback_url: input.callbackUrl,
      metadata: input.metadata,
    }),
  })
}

export interface VerifiedTransaction {
  status: string
  reference: string
  amount: number
  currency: string
  paid_at?: string | null
  customer?: { email?: string }
  metadata?: Record<string, unknown> | null
}

export async function verifyTransaction(reference: string): Promise<VerifiedTransaction> {
  return paystackFetch<VerifiedTransaction>(`/transaction/verify/${encodeURIComponent(reference)}`, {
    method: 'GET',
  })
}

/**
 * Paystack signs the RAW request body with HMAC-SHA512 using the secret key.
 * Never parse-then-hash — re-serialising JSON changes the bytes and breaks it.
 */
export function isValidWebhookSignature(rawBody: string, signature: string | null): boolean {
  if (!signature) return false
  const secret = (process.env.PAYSTACK_SECRET_KEY || '').trim()
  if (!secret) return false

  const expected = createHmac('sha512', secret).update(rawBody, 'utf8').digest('hex')
  const a = Buffer.from(expected, 'utf8')
  const b = Buffer.from(signature, 'utf8')
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}
