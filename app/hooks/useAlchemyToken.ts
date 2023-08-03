'use client'
import { alchemyToken } from '@/data/queries'
import useSWR from 'swr'
import { Address } from 'wagmi'

export function useAlchemyToken({
  contractAddress,
  tokenId,
  refreshInterval = 0,
  cacheKey,
}:{
  contractAddress: Address,
  tokenId: string,
  refreshInterval?: number,
  cacheKey?: string,
}) {

  const { data, error: tokenError } = useSWR(
    cacheKey ?? `useAlchemyToken-${contractAddress}-${tokenId}`,
    () => alchemyToken({contractAddress, tokenId}),
    {
      refreshInterval: refreshInterval,
      shouldRetryOnError: true,
      retry: 3
    }
  )
return {
  token: !data ? null : data?.nft,
  tokenError
}
}

