import { Box, Drawer } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useSidebar } from 'contexts/sidebarContext'
import { ReactNode } from 'react'
import styles from './styles.module.scss'

interface SidebarProps {
  children: ReactNode
  opened: boolean
  setOpened: (opened: boolean) => void
  zIndex?: number
}

export function Sidebar({ children, opened, setOpened, zIndex }: SidebarProps) {
  const largeScreen = useMediaQuery('(min-width: 768px)', false)

  const { createResourceOpened, menuOpened } = useSidebar()
  let withOverlay = false

  if (createResourceOpened || menuOpened || !largeScreen) {
    withOverlay = true
  }

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
      <Box className={styles.container}>{children}</Box>
    </Drawer>
  )
}
