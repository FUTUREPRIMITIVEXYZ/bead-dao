import { GetOwnersForNftResponse, OwnedNft, OwnedNftsResponse } from 'alchemy-sdk'

import { alchemyService } from '@/services'
import { Address } from 'wagmi'

export async function alchemyTokenOwner({
  contractAddress,
  tokenId,
}: {
  contractAddress: Address
  tokenId: string
}) {
  try {
      const nftsForOwner: GetOwnersForNftResponse = await alchemyService.nft.getOwnersForNft(
        contractAddress,
        tokenId,
      )
    return {
      owners: nftsForOwner.owners,
    }
  } catch (error) {
    console.error(error)
  }

  return false
}
