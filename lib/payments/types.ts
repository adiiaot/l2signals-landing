// Shared payment types for the landing `/pay` page.
// Mirrors `l2signal_web/lib/payments/types.ts` but stays free of server imports so
// client components can use it. Price is ALWAYS read from the web app config —
// never from the browser.
//
// Rail policy (2026-10-23): stablecoins only — USDT / USDC. BTC, BNB and SOL were
// removed because a volatile amount has to be re-quoted every minute and the payer
// gets a different number by the time the transfer lands. A dollar-priced stablecoin
// always equals the plan price.

export type PaymentNetwork = 'tron' | 'bnb'

export interface PaymentsConfig {
  plan: {
    usd: number
    ngn: number
    days: number
    graceDays: number
  }
  addresses: Record<PaymentNetwork, string>
  methods: {
    crypto: { enabled: boolean; note: string }
    usd: { enabled: boolean; instructions: string }
    ngn: {
      enabled: boolean
      bankName: string
      accountName: string
      accountNumber: string
      instructions: string
    }
  }
  checkoutUrl: string
}

/** TRON first: cheapest fees, so it is the default. */
export const PAYMENT_NETWORKS: PaymentNetwork[] = ['tron', 'bnb']

export const NETWORK_LABELS: Record<PaymentNetwork, string> = {
  tron: 'TRON (TRC20)',
  bnb: 'BNB Chain (BEP20)',
}

/** Stablecoins only — all priced 1:1 with USD. */
export const NETWORK_ASSETS: Record<PaymentNetwork, string[]> = {
  tron: ['USDT', 'USDC'],
  bnb: ['USDT', 'USDC'],
}

export const NETWORK_PLACEHOLDERS: Record<PaymentNetwork, string> = {
  tron: '64-character transaction hash',
  bnb: '0x… (66 characters)',
}

export const DEFAULT_PAYMENTS_CONFIG: PaymentsConfig = {
  plan: { usd: 40, ngn: 50000, days: 31, graceDays: 5 },
  addresses: { tron: '', bnb: '' },
  methods: {
    crypto: { enabled: true, note: 'Send the exact amount. Copy the address — never type it.' },
    usd: { enabled: true, instructions: 'USD payments — contact @l2signals for the current account details.' },
    ngn: { enabled: true, bankName: '', accountName: '', accountNumber: '', instructions: '' },
  },
  checkoutUrl: '',
}

/** Deep-merge a stored doc over defaults so a missing field can never break rendering. */
export function withPaymentDefaults(raw: unknown): PaymentsConfig {
  const d = DEFAULT_PAYMENTS_CONFIG
  const r = (raw || {}) as Partial<PaymentsConfig>

  return {
    plan: {
      usd: num(r.plan?.usd, d.plan.usd),
      ngn: num(r.plan?.ngn, d.plan.ngn),
      days: num(r.plan?.days, d.plan.days),
      graceDays: num(r.plan?.graceDays, d.plan.graceDays),
    },
    // Explicit pick, not a spread: older config docs still carry sol/btc addresses
    // and those rails are retired.
    addresses: {
      tron: text(r.addresses?.tron),
      bnb: text(r.addresses?.bnb),
    },
    methods: {
      crypto: { ...d.methods.crypto, ...(r.methods?.crypto || {}) },
      usd: { ...d.methods.usd, ...(r.methods?.usd || {}) },
      ngn: { ...d.methods.ngn, ...(r.methods?.ngn || {}) },
    },
    checkoutUrl: typeof r.checkoutUrl === 'string' ? r.checkoutUrl : d.checkoutUrl,
  }
}

function num(value: unknown, fallback: number): number {
  const parsed = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

function text(value: unknown): string {
  return typeof value === 'string' ? value : ''
}
