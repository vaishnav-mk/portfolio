import 'styles/globals.css'
import 'lib/fontawesome'
import { SWRConfig } from 'swr'
import { ThemeProvider } from 'next-themes'
import { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { Navbar } from 'components/Nav/Navbar'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import type { ReactElement, ReactNode } from 'react'

config.autoAddCss = false

import type { NextPage } from 'next'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  //const getLayout = Component.getLayout ?? ((page) => page)
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  } else {
    return (
      <SWRConfig
        value={{
          fetcher: (url: string) =>
            fetch(`/api/${url}`).then((res) => res.json()),
        }}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Toaster position="bottom-left" />
          <div className="flex flex-col min-h-screen w-full">
            <Navbar />
            <div className="p-6 lg:p-10 max-w-4xl m-auto w-full overflow-hidden">
              <Component {...pageProps} />
            </div>
          </div>
        </ThemeProvider>
      </SWRConfig>
    )
  }
}

export default App
