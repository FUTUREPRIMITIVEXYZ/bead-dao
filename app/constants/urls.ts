import { ACTIVE_NETWORK, IS_MAINNET } from '@/constants'

const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY

export const ALCHEMY_ETH_RPC_URL = IS_MAINNET
  ? `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
  : `https://${ACTIVE_NETWORK}.g.alcALCHEMY_ETH_RPC_URLhemy.com/v2/${ALCHEMY_API_KEY}`

export const ETHERSCAN_URI = IS_MAINNET
  ? 'https://etherscan.io'
  : `https://${ACTIVE_NETWORK}.etherscan.io`

// export const CHAIN_AWARE_OPENSEA_URL = IS_MAINNET ? `https://opensea.io` : `https://testnets.opensea.io`
