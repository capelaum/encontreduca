import { Menu, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { ReactNode } from 'react'

interface ActionItemProps {
  onClick: () => void
  icon: ReactNode
  children: ReactNode
}

export function ActionItem({ children, onClick, icon }: ActionItemProps) {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <Menu.Item
      onClick={onClick}
      icon={icon}
      sx={{
        color: dark ? theme.colors.cyan[3] : theme.colors.brand[7],
        fontSize: theme.fontSizes.md,
        '&:hover': {
          backgroundColor: dark ? theme.colors.brand[7] : theme.colors.gray[2]
        },
        width: '100%'
      }}
    >
      {children}
    </Menu.Item>
  )
}
