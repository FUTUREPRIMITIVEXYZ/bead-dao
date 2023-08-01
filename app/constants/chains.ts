import { Network } from 'alchemy-sdk'
import { getChainById } from '@/utils'

export interface ChainIdToAlchemyNetwork {
  [key: number]: Network
}

export const chainIdToAlchemyNetwork: ChainIdToAlchemyNetwork = {
1: Network.ETH_MAINNET,
5: Network.ETH_GOERLI,
11155111: Network.ETH_SEPOLIA,
137: Network.MATIC_MAINNET,
80001: Network.MATIC_MUMBAI,
}

export interface ChainIdToUrl {
  [key: number]: string
}
export const chainIdToEtherscanUrl: ChainIdToUrl = {
1: 'https://etherscan.io',
5: 'https://goerli.etherscan.io',
11155111: 'https://sepolia.etherscan.io',
137: 'https://polygonscan.com',
80001: 'https://mumbai.polygonscan.com',
}

export const chainIdToOpenseaAssetUrl: ChainIdToUrl = {
1: 'https://opensea.io/assets/ethereum',
5: 'https://testnets.opensea.io/assets/goerli',
11155111: 'https://testnets.opensea.io/assets/sepolia',
137: 'https://opensea.io/assets/polygon',
80001: 'https://testnets.opensea.io/assets/mumbai',
}

// @BJ TODO: consider removing chainIdToName. Should be covered by chainIdToAlchemyNetwork
export interface ChainIdToName {
  [key: number]: string
}
export const chainIdToName = {
1: 'ethereum',
5: 'goerli',
11155111: 'sepolia',
137: 'polygon',
80001: 'mumbai',
}

export interface ChainNameToId {
  [key: string]: number
}
export const chainNameToId: ChainNameToId = {
ethereum: 1,
goerli: 5,
sepolia: 11155111,
polygon: 137,
mumbai: 80001,
}

export const ACTIVE_CHAIN = process.env.NEXT_PUBLIC_CHAIN_ID ? getChainById(parseInt(process.env.NEXT_PUBLIC_CHAIN_ID)) : undefined