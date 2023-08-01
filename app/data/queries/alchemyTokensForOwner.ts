import { OwnedNft, OwnedNftsResponse } from 'alchemy-sdk'

import { alchemyService } from '@/services'

export async function alchemyTokensForOwner({
  ownerAddress,
  contractAddresses,
}: {
  ownerAddress: string
  contractAddresses?: string[]
}) {

  // if(!ownerAddress) return []

  try {
    let pageKey
    let nfts: OwnedNft[] = []

    do {
      const nftsForOwner: OwnedNftsResponse = await alchemyService.nft.getNftsForOwner(
        ownerAddress,
        {
          contractAddresses,
          pageKey,
        }
      )

      nfts = [...nfts, ...nftsForOwner.ownedNfts]
      pageKey = nftsForOwner.pageKey
    } while (pageKey)

    return {
      tokens: nfts,
    }
  } catch (error) {
    console.error(error)
  }

  return false
}
