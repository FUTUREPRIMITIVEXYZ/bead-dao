
import { createPublicClient, http } from 'viem'
import { ALCHEMY_ETH_RPC_URL } from '../constants/urls'
import { getChainById } from '@/utils'

export const viemPublicClient = createPublicClient({
  chain: getChainById(parseInt(process.env.NEXT_PUBLIC_CHAIN_ID!)),
  transport: http(ALCHEMY_ETH_RPC_URL),
})