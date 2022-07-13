import { Drawer } from '@mantine/core'
import { ReactNode } from 'react'

interface SidebarProps {
  children: ReactNode
  menuOpened: boolean
  setOpened: (opened: boolean) => void
}

export function Sidebar({ children, menuOpened, setOpened }: SidebarProps) {
  return (
    <Drawer
      opened={menuOpened}
      onClose={() => setOpened(false)}
      padding="md"
      size={420}
      overlayOpacity={0.6}
      overlayBlur={2}
    >
      {children}
    </Drawer>
  )
}
