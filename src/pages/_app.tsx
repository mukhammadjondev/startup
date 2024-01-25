import '@/styles/globals.css'
import '@fontsource/roboto'
import 'react-multi-carousel/lib/styles.css'

import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { theme } from '@/config/theme'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n'
import { Client, HydrationProvider } from 'react-hydration-provider'
import NextNProgress from 'nextjs-progressbar'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import AuthProvider from '@/provider/auth.provider'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <HydrationProvider>
      <Provider store={store}>
        <SessionProvider session={session}>
          <I18nextProvider i18n={i18n}>
            <ChakraProvider theme={theme}>
              <Client>
                <AuthProvider>
                  <NextNProgress options={{showSpinner: false}} />
                  <Component {...pageProps} />
                </AuthProvider>
              </Client>
            </ChakraProvider>
          </I18nextProvider>
        </SessionProvider>
      </Provider>
    </HydrationProvider>
  )
}
