import { PaymentNetwork } from './types'

/**
 * Per-chain transaction-reference rules. A hash is what links a payment to a claim,
 * so a loose regex would let junk through and a tight one would reject real hashes.
 */

const TRON = /^[0-9a-fA-F]{64}$/
const EVM = /^0x[0-9a-fA-F]{64}$/

export function isValidTxHash(network: PaymentNetwork, hash: string): boolean {
  const value = hash.trim()
  switch (network) {
    case 'tron':
      return TRON.test(value)
    case 'bnb':
      return EVM.test(value)
    default:
      return false
  }
}

/**
 * Contract addresses. On BSC anyone can deploy a token called "USDT", so the UI
 * names the contract and never relies on the symbol alone.
 */
export const TOKEN_CONTRACTS: Partial<Record<PaymentNetwork, { symbol: string; address: string }[]>> = {
  tron: [
    { symbol: 'USDT TRC20', address: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t' },
    // USDC on TRON: verify against Circle's official docs before publishing it.
  ],
  bnb: [
    { symbol: 'USDT BEP20', address: '0x55d398326f99059fF775485246999027B3197955' },
    { symbol: 'USDC BEP20', address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d' },
  ],
}
