import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider
} from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import { ModalsProvider } from '@mantine/modals'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ModalReview, ModalSelect, ModalVote } from 'components/Modals'
import { AuthProvider } from 'contexts/authContext'
import { MapProvider } from 'contexts/mapContext'
import { ResourceProvider } from 'contexts/resourceContext'
import { SidebarProvider } from 'contexts/sidebarContext'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { GlobalStyles } from 'styles/global'
import { myTheme } from 'styles/theme'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true
  })

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  useHotkeys([['mod+J', () => toggleColorScheme()]])

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={myTheme} withGlobalStyles withNormalizeCSS>
        <QueryClientProvider client={queryClient}>
          <SessionProvider session={pageProps.session}>
            <AuthProvider>
              <SidebarProvider>
                <ResourceProvider>
                  <MapProvider>
                    <ModalsProvider
                      modals={{
                        review: ModalReview,
                        select: ModalSelect,
                        vote: ModalVote
                      }}
                    >
                      <GlobalStyles />
                      <ToastContainer
                        autoClose={5000}
                        limit={5}
                        position="top-right"
                      />
                      <Component {...pageProps} />
                    </ModalsProvider>
                  </MapProvider>
                </ResourceProvider>
              </SidebarProvider>
            </AuthProvider>
          </SessionProvider>
        </QueryClientProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default MyApp
