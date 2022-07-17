import { Box, Drawer } from '@mantine/core'
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
  const { createResourceOpened, menuOpened } = useSidebar()
  let closeOnClickOutside = true
  let withOverlay = false

  if (createResourceOpened) {
    closeOnClickOutside = false
    withOverlay = true
  }

  if (menuOpened) {
    closeOnClickOutside = false
    withOverlay = true
  }

  return (
    <Drawer
      zIndex={zIndex ?? 1}
      size={420}
      padding={0}
      opened={opened}
      overlayBlur={1}
      overlayOpacity={0.6}
      withCloseButton={false}
      transitionDuration={300}
      onClose={() => setOpened(false)}
      withOverlay={withOverlay}
      transitionTimingFunction="ease-in-out"
      closeOnClickOutside={closeOnClickOutside}
    >
      <Box className={styles.container}>{children}</Box>
    </Drawer>
  )
}
