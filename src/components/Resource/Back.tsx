import { ActionIcon } from '@mantine/core'
import { HiArrowLeft } from 'react-icons/hi'

interface BackProps {
  setResourceOpened: (opened: boolean) => void
}

export function Back({ setResourceOpened }: BackProps) {
  return (
    <ActionIcon
      variant="hover"
      size="lg"
      color="brand"
      onClick={() => setResourceOpened(false)}
      title="Fechar recurso"
      sx={(theme) => ({
        color: theme.colors.cyan[3]
      })}
    >
      <HiArrowLeft size={24} />
    </ActionIcon>
  )
}
