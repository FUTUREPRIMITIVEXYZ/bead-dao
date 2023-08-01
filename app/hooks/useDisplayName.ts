
import { Address,  useEnsName } from 'wagmi'
import { shortenAddress } from '@/utils'

export function useDisplayName(address?: Address) {
  const { data: ensName } = useEnsName({ address })
  
  if(!address) return { displayName: '...' }
  const displayName = ensName ? ensName : shortenAddress(address)

  return {
    displayName
  }
}