import { AppDispatch, wrapper } from '@/store/store'
import '@/styles/globals.scss'
import 'highlight.js/styles/atom-one-dark.css' // github-dark
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'next-themes'
import { useRouter } from 'next/router'
import Script from 'next/script'

function Loading() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setLoading(true)
    const handleComplete = (url: string) =>
      url === router.asPath && setLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  })

  return loading ? (
    <div className="fixed w-screen z-50 h-1 bg-blue-600 dark:bg-purple-500"></div>
  ) : (
    <></>
  )
}

export default function App({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(Component)

  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <Loading />
        <Component {...pageProps} />
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-9K0PKG32YL"
        />
        <Script>
          {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', 'G-9K0PKG32YL');
      `}
        </Script>
      </ThemeProvider>
    </Provider>
  )
}
