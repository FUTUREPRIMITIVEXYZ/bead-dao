
import { alchemyTokensForOwner } from '@/data/queries'
import { useMemo } from 'react';
import useSWR from 'swr'

import { Address } from 'wagmi'

export function useAlchemyTokensForOwner({
  ownerAddress,
  contractAddresses,
  refreshInterval = 0,
  cacheKey,
}:{
  ownerAddress: Address,
  contractAddresses?: Address[],
  refreshInterval?: number,
  cacheKey?: string,
}) {

  const uniqueContractCacheKey = useMemo(() => {
    const sortedAddresses = contractAddresses && contractAddresses.length > 0 ? contractAddresses.sort() : [];
    const uniqueString = sortedAddresses.join(',');
    return `alchemyTokensForOwner-${ownerAddress}-${uniqueString}`
  },[contractAddresses, ownerAddress])
  
  const { data } = useSWR(
    cacheKey ?? uniqueContractCacheKey,
    () => alchemyTokensForOwner({ ownerAddress, contractAddresses }),
    {
      refreshInterval: refreshInterval,
      shouldRetryOnError: true,
      retry: 3
    }
  )
return {
  tokens: !data ? [] : data?.tokens 
}
}

