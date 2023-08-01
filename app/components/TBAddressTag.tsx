import { Address } from 'wagmi'

import clsx from 'clsx'

import { shortenAddress } from '@/utils'
import { TbSwirl } from './icons/generated'

interface TokenBoundWalletContentsProps {
  address: Address
  className?: string
}

export function TBAAddressTag({ address, className }: TokenBoundWalletContentsProps) {
  return (
    <div
      className={clsx(
        'flex flex-row items-center gap-2 py-2 pl-3 pr-3 rounded-full bg-black w-fit text-white',
        className
      )}
    >
      <TbSwirl className="w-5 h-5" />
      <span className="text-white">{shortenAddress(address)}</span>
    </div>
  )
}
