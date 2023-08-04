import { mainnet, goerli, sepolia, foundry, Chain } from 'viem/chains'

// Configure the chains that are enabled for the front end
// We limit chain imports so we aren't imposing ALL chains on the client (we could otherwise `import *`...)
// Note: As new chains are released we may also need to update utils/chains.ts

export const FP_ENABLED_CHAINS: Chain[] = [mainnet, goerli, sepolia, foundry]
