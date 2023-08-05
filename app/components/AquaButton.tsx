import React from 'react'
import clsx from 'clsx'
import { Text } from '@/components/'

type AquaButtonProps = {
  textVariant?: string
  className?: string
  onClick?: () => void
}

export const AquaButton: React.FC<
  AquaButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className, children, onClick }) => {
  return (
    <button
      className={clsx('aqua-button relative py-2 px-8', className)}
      onClick={onClick}
    >
      <div className="aqua-button-shine absolute h-1/2 top-0 left-2 right-2"></div>
      <Text
        variant={'heading-xs'}
        className="text-[#213660]"
        style={{ textShadow: 'text-shadow: 0px 2px 0px rgba(185, 224, 253, 0.40)' }}
      >
        {children}
      </Text>
    </button>
  )
}
