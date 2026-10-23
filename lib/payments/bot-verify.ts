/**
 * Ask the bot to verify an on-chain payment.
 *
 * Verification lives in ONE place — the bot process (`routers/payments.py`) — so
 * the landing page and the Telegram `/pay` flow can never drift apart.
 *
 * Returns `null` when the verifier is not configured or unreachable. Callers MUST
 * treat `null` as "manual review", never as "verified": a sleeping Render instance
 * must never look like a confirmed payment.
 */

export interface BotVerifyResult {
  verified: boolean
  reason?: string
  duplicate?: boolean
  paymentId?: string
  amount?: number
  asset?: string
  network?: string
  inviteLink?: string
  telegramVerified?: boolean
}

export async function verifyWithBot(input: {
  txHash: string
  network: string
  email: string
  token?: string
}): Promise<BotVerifyResult | null> {
  const base = (process.env.BOT_API_URL || '').trim().replace(/\/$/, '')
  const secret = (process.env.PAYMENT_VERIFY_SECRET || '').trim()

  // No bridge configured → the caller records a pending payment for the operator.
  if (!base || !secret) return null

  try {
    const res = await fetch(`${base}/api/payments/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Pay-Secret': secret,
      },
      body: JSON.stringify(input),
      cache: 'no-store',
      // The bot's host can cold-start; past this we hand over to manual review
      // rather than leave the payer staring at a spinner.
      signal: AbortSignal.timeout(12_000),
    })

    if (!res.ok) return null
    const json = (await res.json()) as { ok?: boolean } & BotVerifyResult
    if (!json || json.ok !== true) return null
    return json
  } catch {
    return null
  }
}
