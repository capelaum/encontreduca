import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider
} from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import { ModalsProvider } from '@mantine/modals'
import { ModalReview } from 'components/Modals/ModalReview'
import { ModalSelect } from 'components/Modals/ModalSelect'
import { ModalVote } from 'components/Modals/ModalVote'
import { MapProvider } from 'contexts/mapContext'
import { SidebarProvider } from 'contexts/sidebarContext'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import { GlobalStyles } from 'styles/global'
import { myTheme } from 'styles/theme'

import 'react-toastify/dist/ReactToastify.min.css'

function MyApp({ Component, pageProps }: AppProps) {
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
        <SidebarProvider>
          <ModalsProvider
            modals={{
              review: ModalReview,
              select: ModalSelect,
              vote: ModalVote
            }}
          >
            <MapProvider>
              <GlobalStyles />
              <ToastContainer autoClose={5000} limit={5} position="top-right" />
              <Component {...pageProps} />
            </MapProvider>
          </ModalsProvider>
        </SidebarProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default MyApp
