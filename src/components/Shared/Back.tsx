import { ActionIcon, useMantineColorScheme } from '@mantine/core'
import { HiArrowLeft } from 'react-icons/hi'

interface BackProps {
  setSidebarOpened: (opened: boolean) => void
}

export function Back({ setSidebarOpened }: BackProps) {
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <ActionIcon
      variant="hover"
      size="lg"
      onClick={() => setSidebarOpened(false)}
      title="Fechar recurso"
      sx={(theme) => ({
        color: dark ? theme.colors.cyan[3] : theme.colors.brand[7],
        backgroundColor: dark ? theme.colors.brand[7] : theme.colors.gray[0],
        '&:hover': {
          backgroundColor: dark ? theme.colors.brand[8] : theme.colors.gray[1]
        }
      })}
    >
      <HiArrowLeft size={24} />
    </ActionIcon>
  )
}
