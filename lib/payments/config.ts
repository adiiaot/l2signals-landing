import { PaymentsConfig, withPaymentDefaults } from './types'

/**
 * Plan price + deposit instructions live in ONE place: `config/payments` in
 * Firestore, editable from `l2signal_web` → /dashboard/payments.
 *
 * The landing site reads the public copy. It must never accept an amount from the
 * browser — every route recomputes the price from here.
 */

const WEB_API = (process.env.NEXT_PUBLIC_L2_WEB_API || 'https://l2signal-web-six.vercel.app').replace(/\/$/, '')

export async function getPaymentsConfig(): Promise<PaymentsConfig> {
  try {
    const res = await fetch(`${WEB_API}/api/payments/config`, {
      next: { revalidate: 30 },
      signal: AbortSignal.timeout(6000),
    })
    if (!res.ok) throw new Error(`config ${res.status}`)
    const json = await res.json()
    return withPaymentDefaults(json?.config)
  } catch (error) {
    console.warn('[pay] falling back to default payments config:', error instanceof Error ? error.message : error)
    return withPaymentDefaults(null)
  }
}

/** Public, client-safe slice of the config. No secrets live here by design. */
export interface PublicPayConfig {
  plan: PaymentsConfig['plan']
  addresses: PaymentsConfig['addresses']
  methods: PaymentsConfig['methods']
  /** Online payments are hidden until the Paystack secret key is set. */
  paystackEnabled: boolean
  /** Currency Paystack will actually charge — shown on the checkout button. */
  paystackCurrency: 'NGN' | 'USD'
  /** Bot deep-link base, e.g. https://t.me/l2signals_bot — null hides Telegram verification. */
  telegramBotUrl: string | null
}

export function toPublicConfig(config: PaymentsConfig): PublicPayConfig {
  const botUrl = (process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL || '').trim()
  return {
    plan: config.plan,
    addresses: config.addresses,
    methods: config.methods,
    paystackEnabled: isPaystackConfigured(),
    paystackCurrency: process.env.PAYSTACK_USD_ENABLED === 'true' ? 'USD' : 'NGN',
    telegramBotUrl: botUrl || null,
  }
}

/**
 * A key is only usable if it looks like a real live/test key. The `.env.example`
 * placeholder must never make the online tab appear, or a checkout would 401.
 */
export function isPaystackConfigured(): boolean {
  const key = (process.env.PAYSTACK_SECRET_KEY || '').trim()
  if (!/^sk_(test|live)_/.test(key)) return false
  if (key.length < 24) return false
  if (/your_key|placeholder|xxx/i.test(key)) return false
  return true
}
