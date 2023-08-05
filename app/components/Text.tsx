import { Slot } from '@radix-ui/react-slot'

import clsx from 'clsx'
import { cva, type VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { CSSProperties } from 'react'

const text = cva('', {
  variants: {
    variant: {
      default: [''], // default to nothing, for custom styling (should be rare)

      // Heading variants
      'heading-xxl': ['text-4xl', 'font-display', 'font-semibold'], // 64
      'heading-xl': ['text-3xl', 'font-display', 'font-semibold'], // 48
      'heading-lg': ['text-2xl', 'font-display', 'font-semibold'], // 40
      'heading-md': ['text-2xl', 'font-display', 'font-semibold'], // 32
      'heading-sm': ['text-xl', 'font-display', 'font-semibold'], // 24
      'heading-xs': ['text-base', 'font-display', 'font-semibold'], // 15

      // Paragraph variants
      'paragraph-lg': ['text-lg', 'font-primary'], // 20px
      'paragraph-md': ['text-base', 'font-primary'], // 15px
      'paragraph-sm': ['text-sm', 'font-primary'], // 14px
      'paragraph-xs': ['text-xs', 'font-primary'], // 12px

      // accent: ['text-base', 'font-mono'], // 16px
      // 'accent-bold': ['text-base', 'font-mono', 'font-bold'], // 16px
    },
  },
  defaultVariants: {
    variant: 'paragraph-md',
  },
})

interface TextProps extends VariantProps<typeof text> {
  asChild?: boolean
  children: React.ReactNode
  isInline?: boolean
  className?: string
  style?: CSSProperties
}

export function Text({
  asChild = false,
  variant,
  children,
  isInline, // Override + set line-height to 1
  className,
  style,
  ...rest
}: TextProps) {
  const Component = asChild ? Slot : 'div'
  return (
    <Component
      className={twMerge(
        // twMerge ensures default Tailwind CVA styles can be overridden correctly
        text({ variant }),
        clsx(
          '',
          {
            'leading-none': isInline,
          },
          className
        )
      )}
      {...rest}
    >
      {children}
    </Component>
  )
}
