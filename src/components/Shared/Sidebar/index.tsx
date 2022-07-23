import {
  Box,
  CSSObject,
  Drawer,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useSidebar } from 'contexts/sidebarContext'
import { ReactNode } from 'react'

interface SidebarProps {
  children: ReactNode
  opened: boolean
  setOpened: (opened: boolean) => void
  zIndex?: number
}

export function Sidebar({ children, opened, setOpened, zIndex }: SidebarProps) {
  const largeScreen = useMediaQuery('(min-width: 768px)', false)
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { createResourceOpened, menuOpened } = useSidebar()
  let withOverlay = false

  if (createResourceOpened || menuOpened || !largeScreen) {
    withOverlay = true
  }

  const BoxStyles = (): CSSObject => ({
    height: '100vh',
    overflowY: 'scroll',
    scrollbarWidth: 'thin',
    color: dark ? theme.colors.cyan[3] : theme.colors.brand[9],
    backgroundColor: dark ? theme.colors.brand[7] : theme.colors.gray[0],
    scrollbarColor: `${
      dark ? theme.colors.cyan[3] : theme.colors.brand[9]
    } transparent`,

    '&::-webkit-scrollbar': {
      background: 'transparent',
      width: '3px',
      '&:hover': {
        background: 'transparent',
        width: '1.5px'
      }
    },

    '&::-webkit-scrollbar-thumb': {
      background: dark ? theme.colors.cyan[3] : theme.colors.brand[9],
      borderRadius: '50px',
      width: '1px',
      '&:hover': {
        width: '5px'
      }
    }
  })

  return (
    <Drawer
      zIndex={zIndex ?? 1}
      size={largeScreen ? '420px' : '100%'}
      padding={0}
      opened={opened}
      overlayBlur={1}
      overlayOpacity={0.6}
      withCloseButton={false}
      transitionDuration={300}
      onClose={() => setOpened(false)}
      withOverlay={withOverlay}
      transitionTimingFunction="ease-in-out"
    >
      <Box sx={BoxStyles}>{children}</Box>
    </Drawer>
  )
}
