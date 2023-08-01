import clsx from 'clsx'

interface Props {
  className?: string
}

export function Footer({ className, ...rest }: Props) {
  return (
    <div
      className={clsx('flex p-5 bg-black justify-center text-white', className)}
      {...rest}
    >
      FOOTER
    </div>
  )
}
