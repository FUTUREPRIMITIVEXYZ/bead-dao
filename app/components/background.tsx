import { useHasMounted } from '@/hooks'

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
      className={`${className} w-screen h-screen overflow-scroll bg-main bg-cover bg-center bg-no-repeat`}
    >
      {hasMounted && (
        <div
          className={`h-full w-full ${
            display || 'flex flex-col items-center justify-center'
          } py-4 pb-20`}
        >
          {children}
        </div>
      )}
    </div>
  )
}
