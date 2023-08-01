'use client'

import { Inter, SpaceMono, SourceCodePro400 } from '@/fonts'
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
            --font-inter: ${Inter.style.fontFamily}, sans-serif;
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
