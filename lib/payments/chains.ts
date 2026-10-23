import { PaymentNetwork } from './types'

/**
 * Per-chain transaction-reference rules. A hash is what links a payment to a claim,
 * so a loose regex would let junk through and a tight one would reject real hashes.
 */

const TRON = /^[0-9a-fA-F]{64}$/
const EVM = /^0x[0-9a-fA-F]{64}$/
/** Solana signatures are base58 (no 0x), usually 87–88 characters. */
const SOL = /^[1-9A-HJ-NP-Za-km-z]{80,90}$/

export function isValidTxHash(network: PaymentNetwork, hash: string): boolean {
  const value = hash.trim()
  switch (network) {
    case 'tron':
      return TRON.test(value)
    case 'bnb':
      return EVM.test(value)
    case 'sol':
      return SOL.test(value)
    default:
      return false
  }
}

/**
 * Contract addresses. On BSC anyone can deploy a token called "USDT", so the UI
 * names the contract and never relies on the symbol alone.
 *
 * One asset per network by policy — USDC exists only on Solana here. Do not add a
 * USDC contract to TRON or BSC: the deposit address for those chains belongs to a
 * different wallet and the funds would be lost.
 */
export const TOKEN_CONTRACTS: Partial<
  Record<PaymentNetwork, { symbol: string; address: string }[]>
> = {
  tron: [{ symbol: 'USDT TRC20', address: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t' }],
  bnb: [{ symbol: 'USDT BEP20', address: '0x55d398326f99059fF775485246999027B3197955' }],
  sol: [{ symbol: 'USDC SPL', address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v' }],
}
