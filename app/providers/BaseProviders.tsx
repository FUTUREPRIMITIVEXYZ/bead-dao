'use client'

import { SWRConfig } from 'swr'
import { FP_APP, FP_ENABLED_CHAINS } from '@/config'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import '@rainbow-me/rainbowkit/styles.css'

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'

const swrFetcher = (url: string, params: RequestInit) =>
  fetch(url, params)
    .then((r) => r.text())
    .then((t) => {
      try {
        return JSON.parse(t)
      } catch (e) {
        return undefined
      }
    })

const { chains, publicClient } = configureChains(FP_ENABLED_CHAINS, [
  alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY! }),
  publicProvider(),
])

const { connectors } = getDefaultWallets({
  appName: 'BEAD DAO',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: FP_ENABLED_CHAINS,
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

type ProviderType = {
  children: React.ReactNode
}

export function BaseProviders({ children }: ProviderType) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={FP_ENABLED_CHAINS}>
        <SWRConfig
          value={{
            revalidateOnFocus: false,
            fetcher: swrFetcher,
          }}
        >
          {children}
        </SWRConfig>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
