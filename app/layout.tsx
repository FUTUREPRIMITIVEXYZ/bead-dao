import { Header, Footer } from '@/components'
import './globals.css'
import './custom.css'
import { BaseProviders, GlobalStyleProvider } from '@/providers'
import { FP_APP } from '@/config'

export const metadata = {
  title: FP_APP.NAME,
  description: FP_APP.DESCRIPTION,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GlobalStyleProvider>
          <BaseProviders>
            <Header />
            {children}
          </BaseProviders>
        </GlobalStyleProvider>
      </body>
    </html>
  )
}
