// import { Text } from '@/components'
import clsx from 'clsx'
import { cva, type VariantProps } from 'class-variance-authority'

const button = cva('replace this text with styles shared by all variants', {
  variants: {
    variant: {
      default: ['aqua-button aqua-button-blue inline-block'],
      aquaGrey: ['aqua-button aqua-button-grey inline-block'],
    },
    defaultVariants: {
      variant: 'default',
    },
  },
})

interface Props extends VariantProps<typeof button> {
  className?: string
}

export const Button: React.FC<Props & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  type = 'button',
  children,
  variant = 'default',
  onClick = () => {},
}) => {
  return (
    <button
      type={type}
      className={clsx(button({ variant }), className)}
      onClick={onClick}
    >
      {/* <Text variant="paragraph-md">{children}</Text> */}
      {children}
    </button>
  )
}
