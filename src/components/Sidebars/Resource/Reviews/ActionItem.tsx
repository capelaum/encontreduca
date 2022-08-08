import { Menu, useMantineTheme } from '@mantine/core'
import { ReactNode } from 'react'

interface ActionItemProps {
  onClick: () => void
  icon: ReactNode
  children: ReactNode
}

export function ActionItem({ children, onClick, icon }: ActionItemProps) {
  const theme = useMantineTheme()

  return (
    <Menu.Item
      onClick={onClick}
      icon={icon}
      sx={{
        color: theme.colors.cyan[3],
        fontSize: theme.fontSizes.md,
        '&:hover': {
          backgroundColor: theme.colors.brand[7]
        },
        width: '100%'
      }}
    >
      {children}
    </Menu.Item>
  )
}
