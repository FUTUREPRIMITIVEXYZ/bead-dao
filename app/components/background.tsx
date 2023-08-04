'use client'
import { useHasMounted } from '@/hooks'
import clsx from 'clsx'
interface Props {
  display?: string
}

export const Background: React.FC<Props & React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  display,
}) => {
  const hasMounted = useHasMounted()
  return (
    <div
      className={clsx(
        `w-screen h-screen overflow-scroll bg-main bg-cover bg-center bg-no-repeat`,
        className
      )}
    >
      {hasMounted && (
        <div
          className={`h-full w-full ${
            display || 'flex flex-col items-center justify-center'
          }`}
        >
          {children}
        </div>
      )}
    </div>
  )
}
