import { Chain } from 'viem/chains'
import { FP_ENABLED_CHAINS } from '../config'

/**
 * Gets the chain object for the given chain id.
 * @param chainId - Chain id of the target EVM chain.
 * @returns Viem's chain object.
 */
export function getChainById(chainId: number): Chain {
  for (const chain of FP_ENABLED_CHAINS) {
    if ('id' in chain) {
        if (chain.id === chainId) {
        return chain
      }
    }
  }

  throw new Error(`Chain with id ${chainId} not found`)
}