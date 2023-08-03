'use client'

import { useMemo } from 'react'
import { useAccount } from 'wagmi'
import { TokenboundClient } from '@tokenbound/sdk'
import { createWalletClient, http, WalletClient } from 'viem'
import { ACTIVE_CHAIN } from '@/constants'
import { TBAAddressTag } from '@/components'

import clsx from 'clsx'

interface Props {
  className?: string
}

export function TBAccount({ className }: Props) {
  const { address } = useAccount()

  const walletClient: WalletClient = createWalletClient({
    chain: ACTIVE_CHAIN,
    account: address,
    transport: http(),
  })

  const tokenboundClient = useMemo(
    () =>
      ACTIVE_CHAIN
        ? new TokenboundClient({ walletClient, chainId: ACTIVE_CHAIN.id })
        : null,
    [walletClient]
  )

  const tbAddress = useMemo(
    () =>
      tokenboundClient
        ? tokenboundClient.getAccount({
            tokenContract: '0xe7134a029cd2fd55f678d6809e64d0b6a0caddcb',
            tokenId: '9',
          })
        : null,
    [tokenboundClient]
  )

  return (
    <div className={clsx('text-black', className)}>
      {tbAddress ? <TBAAddressTag address={tbAddress} /> : '...'}
    </div>
  )
}
