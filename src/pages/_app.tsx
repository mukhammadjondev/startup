import '@/styles/globals.css'
import '@fontsource/roboto'

import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { theme } from '@/config/theme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
