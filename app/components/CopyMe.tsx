import clsx from 'clsx'
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

export function CopyMe({ variant, isCopyable, className, ...rest }: Props) {
  return (
    <div
      className={clsx(
        // Base styles go here:
        'for example text-black opacity-25',

        // Styles for the active variant:
        exampleComponent({ variant }),

        // Conditional styles go here:
        {
          ['conditionalstyle1 additionalStyle1']: className?.includes('addStyleBlock1'),
          ['copyable']: isCopyable,
        },
        // Always allow external style overrides:
        className
      )}
      {...rest}
    >
      <span>Copy Me</span>
    </div>
  )
}
