'use client'

import { SpaceMono, SourceCodePro400 } from '@/fonts'
import { useHasMounted } from '@/hooks'

type ProviderType = {
  children: React.ReactNode
}

export function GlobalStyleProvider({ children }: ProviderType) {
  const hasMounted = useHasMounted()

  return (
    <>
      {hasMounted && (
        <style>
          {`
          html {
            --font-display: 'SF Pro Display Semibold', 'Helvetica Neue', sans-serif;
            --font-primary: 'SF Pro Display', 'Helvetica Neue', sans-serif;
            --font-space_mono: ${SpaceMono.style.fontFamily}, monospace;
            --font-sourcecode400: ${SourceCodePro400.style.fontFamily}, monospace;
          }
        `}
        </style>
      )}

      {children}
    </>
  )
}
