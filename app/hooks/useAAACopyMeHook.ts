import { viemPublicClient } from '@/services'
import useSWR from 'swr'

// This is an example hook to copy from
// It highlights some important items to consider when creating a hook using SWR

export function useAAACopyMeHook({
  
  // These are just examples of some base parameters that you might want to pass in
  tokenContract,
  tokenId,

  // How often should the data for this hook be re-fetched, in ms?
  // 0 means no refresh, 1000 means every second, and so on
  refreshInterval = 0,

  // initialData will be used as the fallback data until the first request finishes
  // This is useful if you want to display some data immediately
  // It's really useful if you're using SSR
  initialData,

  // This is the key used to cache the data after it has been fetched
  // Ideally we want this to be unique to the use case, but it's not required
  cacheKey,

}:{
  // Base Params
  tokenContract: `0x${string}`,
  tokenId: string,

  initialData?: any, // <-- replace 'any' with the type of the data you're fetching

  refreshInterval?: number,
  cacheKey?: string,
}) {

  // This is the key used to cache the data.
  // It should usually be unique to the use case, 
  const dynamicCacheKey = cacheKey ?? `${tokenContract}-${tokenId}`

  const { data: accountBytecode, isLoading, isValidating, error } = useSWR(
    dynamicCacheKey,
    // async () => {
    async function(): Promise<number> { 
      // This is where you fetch the data using a service or endpoint
      // In this example, we're using the viemPublicClient service
      // You can replace this with your own service or endpoint
      return viemPublicClient.getChainId()
    },
    {
      refreshInterval: refreshInterval,
      fallbackData: initialData,
    }
  )

  return {
    rawData: accountBytecode, // <-- As a convention, we always return the raw data from the hook. 
    accountBytecode,
    accountBytecodeLoading: isLoading,
    accountBytecodeValidating: isValidating,
    accountBytecodeError: error,
  }
}

