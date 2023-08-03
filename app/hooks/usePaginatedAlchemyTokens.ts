'use client'
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite";

import { Address } from 'wagmi'
import { useCallback, useMemo } from 'react'
import { OwnedNftsResponse } from 'alchemy-sdk'
import { alchemyService } from '@/services';
import { Paginator } from "@/types";

export const PAGINATED_TOKENS_PER_PAGE = 12

export function usePaginatedAlchemyTokens({
  ownerAddress,
  refreshInterval = 0,
  contractAddresses,
  pageSize = PAGINATED_TOKENS_PER_PAGE,
  initialData
}:{
  ownerAddress: Address,
  contractAddresses?: string[],
  refreshInterval?: number,
  pageSize?: number,
  cacheKey?: string,
  initialData?: OwnedNftsResponse
}) {

  const getKey = (pageIndex: number, prevData: OwnedNftsResponse) => {
    const sortedAddresses = contractAddresses && contractAddresses.length > 0 ? contractAddresses.sort() : [];
    if (pageIndex > 0 && !prevData.pageKey) return
    return `/ownerNFTs?ownerAddress=${ownerAddress}&contracts=${sortedAddresses}&pageKey=${prevData?.pageKey}`
  };

  const {data, setSize, size, isLoading, isValidating}: SWRInfiniteResponse<OwnedNftsResponse, any> = useSWRInfinite(
    getKey,
    async (key) => {
      const params = new Proxy(new URLSearchParams(key), {
        get: (searchParams, prop: string) => searchParams.get(prop),
      });

      const nftsForOwner: OwnedNftsResponse = await alchemyService.nft.getNftsForOwner(
        ownerAddress,
        {
          contractAddresses,
          //@ts-ignore // pageKey is not in the type definition
          pageKey: params?.pageKey,
          pageSize,
        }
      )

      return nftsForOwner

    },
    {
      refreshInterval: refreshInterval,
      shouldRetryOnError: true,
      fallbackData: initialData ? [initialData] : [],
    }
  )

  const handleLoadMore = useCallback(() => {
    if (!isValidating && data && data?.[data?.length-1].pageKey){
      setSize(size + 1)
    }
  },[data, setSize, size, isValidating])

  const tokens = useMemo(() => data ? data.flat()
    .filter((d) => d && d.ownedNfts) // Filter out undefined or null values
    .map((d) => d.ownedNfts)
    .flat()
  : [], [data])

  const paginator: Paginator = {
    isLoadingMore: isLoading,
    hasMoreTokens: !!(data && data?.[data?.length-1].pageKey !== undefined),
    handleLoadMore,
  }

  return {
    rawOwnedNftsResponse: data,
    tokens,
    paginator,
    isValidating
  }

}