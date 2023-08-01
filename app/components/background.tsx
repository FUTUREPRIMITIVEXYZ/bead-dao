import { Badge } from './badge'
import Link from 'next/link'
import { useAccount } from 'wagmi'

import { Button } from './button'
import { useState } from 'react'

interface Props {
  display?: string
}

export const Background: React.FC<Props & React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  display,
}) => {
  return (
    <div
      className={`${className} w-screen h-screen overflow-scroll bg-main bg-cover bg-center bg-no-repeat`}
    >
      <div
        className={`h-full w-full ${
          display || 'flex flex-col items-center justify-start'
        } py-4 pb-20`}
      >
        {children}
      </div>
    </div>
  )
}
