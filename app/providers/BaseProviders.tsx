'use client'

import { WagmiConfig, createConfig, mainnet, sepolia } from 'wagmi'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import { SWRConfig } from 'swr'
import { FP_APP, FP_ENABLED_CHAINS } from '@/config'

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

const wagmiConfig = createConfig(
  getDefaultConfig({
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID!,
    chains: FP_ENABLED_CHAINS,
    appName: FP_APP.NAME,
    appDescription: FP_APP.DESCRIPTION,
    appUrl: FP_APP.URL,
  })
)

type ProviderType = {
  children: React.ReactNode
}

export function BaseProviders({ children }: ProviderType) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <ConnectKitProvider debugMode>
        <SWRConfig
          value={{
            revalidateOnFocus: false,
            fetcher: swrFetcher,
          }}
        >
          {children}
        </SWRConfig>
      </ConnectKitProvider>
    </WagmiConfig>
  )
}
