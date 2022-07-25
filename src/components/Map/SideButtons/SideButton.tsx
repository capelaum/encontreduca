import { ActionIcon, useMantineColorScheme } from '@mantine/core'
import { ReactNode } from 'react'

interface SideButtonProps {
  onClick: () => void
  text: string
  children: ReactNode
}

export function SideButton({ onClick, text, children }: SideButtonProps) {
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <ActionIcon
      sx={(theme) => ({
        color: dark ? theme.colors.cyan[3] : theme.colors.brand[7],
        backgroundColor: dark ? theme.colors.brand[7] : theme.white,
        '&:hover': {
          backgroundColor: dark ? theme.colors.brand[8] : theme.colors.gray[0]
        },
        boxShadow: dark ? 'none' : '0 1px 4px rgba(0, 0, 0, 0.3)'
      })}
      variant="filled"
      size="xl"
      color="brand"
      onClick={() => onClick()}
      title={text}
    >
      {children}
    </ActionIcon>
  )
}
