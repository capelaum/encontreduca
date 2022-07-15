import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider
} from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import { ModalsProvider } from '@mantine/modals'
import { ModalReview } from 'components/Modal/ModalReview'
import { ModalSelect } from 'components/Modal/ModalSelect'
import { MapProvider } from 'contexts/mapContext'
import { SidebarProvider } from 'contexts/sidebarContext'
import type { AppProps } from 'next/app'
import { myTheme } from '../styles/theme'

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
        <MapProvider>
          <SidebarProvider>
            <ModalsProvider
              modals={{ review: ModalReview, select: ModalSelect }}
            >
              <Component {...pageProps} />
            </ModalsProvider>
          </SidebarProvider>
        </MapProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default MyApp
