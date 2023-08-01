import { Nft } from 'alchemy-sdk'

import { alchemyService } from '@/services'
import { Address } from 'wagmi'

export async function alchemyToken({
  contractAddress,
  tokenId,
}: {
  contractAddress: Address
  tokenId: string
}) {
  try {
      const nft: Nft = await alchemyService.nft.getNftMetadata(contractAddress, tokenId)
    return {
      nft
    }
  } catch (error) {
    console.error(error)
  }

  return false
}
