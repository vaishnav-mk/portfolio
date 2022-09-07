import 'styles/globals.css'
import 'lib/fontawesome'
import { SWRConfig } from 'swr'
import { ThemeProvider } from 'next-themes'
import { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { Navbar } from 'components/Nav/Navbar'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false
const App = ({ Component, pageProps }: AppProps) => {
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

export default App
