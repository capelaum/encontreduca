import { Box, Drawer } from '@mantine/core'
import { useSidebar } from 'contexts/sidebarContext'
import { ReactNode } from 'react'
import styles from './styles.module.scss'

interface SidebarProps {
  children: ReactNode
  opened: boolean
  setOpened: (opened: boolean) => void
}

export function Sidebar({ children, opened, setOpened }: SidebarProps) {
  const { menuOpened, changeResourceOpened } = useSidebar()
  let closeOnClickOutside = true

  if (!menuOpened) {
    closeOnClickOutside = false
  }

  if (!changeResourceOpened) {
    closeOnClickOutside = false
  }

  return (
    <Drawer
      opened={opened}
      onClose={() => setOpened(false)}
      padding={0}
      size={420}
      transitionDuration={300}
      transitionTimingFunction="ease-in-out"
      withCloseButton={false}
      overlayBlur={1}
      overlayOpacity={0.6}
      withOverlay={changeResourceOpened || menuOpened}
      zIndex={1}
      closeOnClickOutside={closeOnClickOutside}
    >
      <Box className={styles.container}>{children}</Box>
    </Drawer>
  )
}
