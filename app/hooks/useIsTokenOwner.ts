'use client'
import { alchemyTokenOwner } from '@/data/queries'
import { isAddressMatch } from '@/utils'

import { useMemo } from 'react'
import useSWR from 'swr'
import { Address } from 'wagmi'

export function useIsTokenOwner({
  contractAddress,
  tokenId,
  walletAddress,
  refreshInterval = 0,
  cacheKey = 'isTokenOwner'
}: {
  contractAddress: Address,
  tokenId: string,
  walletAddress: Address,
  refreshInterval?: number,
  cacheKey?: string,
}) {

  const {data} = useSWR(
    `${cacheKey}-${walletAddress}-${contractAddress}-${tokenId}`,
    () => alchemyTokenOwner({ contractAddress, tokenId }),
    {
      refreshInterval: refreshInterval,
      shouldRetryOnError: true,
      retry: 3,
    }
  )

  const isOwner = useMemo(() => !!(data && data?.owners?.find((owner) => isAddressMatch(owner, walletAddress))),[data, walletAddress])

  return {
    isOwner,
    nonExistentToken: !data 
  }

}
