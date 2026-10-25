// Shared payment types for the landing `/pay` page.
// Mirrors `l2signal_web/lib/payments/types.ts` but stays free of server imports so
// client components can use it. Price is ALWAYS read from the web app config —
// never from the browser.
//
// Rail policy (2026-10-24): one network carries exactly ONE asset.
//   USDT · TRON (TRC20)
//   USDT · BNB Chain (BEP20)
//   USDC · Solana (SPL)
//
// This is a safety invariant, not a preference. The receiving address is looked up
// per network, so advertising USDC under TRON would hand the payer the TRON
// address and the transfer could never be recovered. Do not add a second asset to
// a network — add a network instead.
//
// Volatile coins (BTC, ETH, BNB, SOL) remain excluded: their amount cannot be
// quoted once and stay correct. Solana appears only as a *network* for USDC.

export type PaymentNetwork = 'tron' | 'bnb' | 'sol'

export type PaymentAsset = 'USDT' | 'USDC'

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
export const PAYMENT_NETWORKS: PaymentNetwork[] = ['tron', 'bnb', 'sol']

export const NETWORK_LABELS: Record<PaymentNetwork, string> = {
  tron: 'TRON (TRC20)',
  bnb: 'BNB Chain (BEP20)',
  sol: 'Solana (SPL)',
}

/** Exactly one asset per network. Never widen this to an array. */
export const NETWORK_ASSET: Record<PaymentNetwork, PaymentAsset> = {
  tron: 'USDT',
  bnb: 'USDT',
  sol: 'USDC',
}

/** Kept single-element for any caller that iterates assets. */
export const NETWORK_ASSETS: Record<PaymentNetwork, PaymentAsset[]> = {
  tron: ['USDT'],
  bnb: ['USDT'],
  sol: ['USDC'],
}

/** "USDT · TRON (TRC20)" — the payer picks this, never network and asset separately. */
export function networkOptionLabel(network: PaymentNetwork): string {
  return `${NETWORK_ASSET[network]} · ${NETWORK_LABELS[network]}`
}

export const NETWORK_PLACEHOLDERS: Record<PaymentNetwork, string> = {
  tron: '64-character transaction hash',
  bnb: '0x… (66 characters)',
  sol: 'Solana signature (base58, ~88 characters)',
}

/**
 * The Solana USDC deposit address is seeded here so the rail works on the next
 * deploy; the dashboard (`/dashboard/payments`) is the source of truth and any
 * saved value overrides this.
 */
export const SOLANA_USDC_ADDRESS = '4jqTsSGsgwPdN6su8RMgrXTBXj5F2erU8BT2kqF7zzyo'

export const DEFAULT_PAYMENTS_CONFIG: PaymentsConfig = {
  plan: { usd: 40, ngn: 50000, days: 31, graceDays: 5 },
  addresses: { tron: '', bnb: '', sol: SOLANA_USDC_ADDRESS },
  methods: {
    crypto: { enabled: true, note: 'Send the exact amount. Copy the address — never type it.' },
    usd: { enabled: true, instructions: 'USD payments — contact @aotayoL2 for the current account details.' },
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
    // Explicit pick, not a spread: retired rails (btc/eth) must not resurface from
    // an old config doc. Every live network is listed here by hand.
    addresses: {
      tron: text(r.addresses?.tron),
      bnb: text(r.addresses?.bnb),
      sol: text(r.addresses?.sol) || d.addresses.sol,
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
