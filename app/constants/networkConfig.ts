import { ACTIVE_CHAIN, chainIdToAlchemyNetwork } from "."

export const ACTIVE_NETWORK = process.env.NEXT_PUBLIC_CHAIN_ID ? chainIdToAlchemyNetwork[Number(process.env.NEXT_PUBLIC_CHAIN_ID)] : undefined
export const IS_TESTNET = process.env.NEXT_PUBLIC_CHAIN_ID !== '1'
export const IS_MAINNET = process.env.NEXT_PUBLIC_CHAIN_ID === '1'

export const NetworkConfig = {
    chain: ACTIVE_CHAIN,
    network: ACTIVE_NETWORK,
}
