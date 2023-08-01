import { Address } from 'wagmi'
import { isAddress } from 'viem'

// @BJ TODO: make the URL chain-aware
export function getTokenboundWalletURL(tbWalletAddress: Address) {
  if (!isAddress(tbWalletAddress)) {
    throw new Error('not a valid address')
  }
  const tbWalletURL = `https://tokenbound.org/wallet/${tbWalletAddress}`
  return tbWalletURL
}
