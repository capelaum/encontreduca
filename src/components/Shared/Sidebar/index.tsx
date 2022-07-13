import { ActionIcon, Drawer } from '@mantine/core'
import { ReactNode } from 'react'
import { MdClose } from 'react-icons/md'
import { theme as myTheme } from 'styles/theme'

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
      padding={0}
      size={420}
      overlayOpacity={0.6}
      overlayBlur={2}
      transitionDuration={300}
      transitionTimingFunction="ease-in"
      withCloseButton={false}
    >
      <ActionIcon
        variant="hover"
        size="lg"
        color="brand"
        onClick={() => setOpened(false)}
        title="Fechar Menu"
        sx={(theme) => ({
          color: theme.colors.cyan[3],
          position: 'absolute',
          top: theme.spacing.md,
          right: theme.spacing.md
        })}
      >
        <MdClose size={24} color={myTheme.colors!.brand![5]} />
      </ActionIcon>

      {children}
    </Drawer>
  )
}
