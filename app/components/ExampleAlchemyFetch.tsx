'use client'

import clsx from 'clsx'
import { useAlchemyToken } from '@/hooks'
import { cva, type VariantProps } from 'class-variance-authority'

const exampleComponent = cva('replace this text with styles shared by all variants', {
  variants: {
    variant: {
      variant1: ['variant1style1 variant1style2'],
      variant2: ['variant2style1 variant2style2'],
    },
    defaultVariants: {
      variant: 'variant1',
    },
  },
})

interface Props extends VariantProps<typeof exampleComponent> {
  className?: string
  isCopyable?: boolean
}

export function ExampleAlchemyFetch({ variant, isCopyable, className, ...rest }: Props) {
  const { token } = useAlchemyToken({
    contractAddress: '0x4b10701bfd7bfedc47d50562b76b436fbb5bdb3b',
    tokenId: '1',
  })

  return <div className={clsx('alchemy-token', className)}>{token?.title}</div>
}
