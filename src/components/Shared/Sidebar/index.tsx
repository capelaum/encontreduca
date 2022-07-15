import { Box, Drawer } from '@mantine/core'
import { ReactNode } from 'react'
import styles from './styles.module.scss'

interface SidebarProps {
  children: ReactNode
  opened: boolean
  setOpened: (opened: boolean) => void
}

export function Sidebar({ children, opened, setOpened }: SidebarProps) {
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
      withOverlay={false}
      zIndex={1}
    >
      <Box className={styles.container}>{children}</Box>
    </Drawer>
  )
}
