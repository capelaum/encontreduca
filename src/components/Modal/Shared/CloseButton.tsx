import { ActionIcon } from '@mantine/core'
import { MdClose } from 'react-icons/md'
import { myTheme } from 'styles/theme'

interface CloseButtonProps {
  onClick: () => void
}

export function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <ActionIcon
      variant="hover"
      size="lg"
      color="brand"
      onClick={onClick}
      title="Fechar Menu"
      sx={(theme) => ({
        color: theme.colors.cyan[3],
        position: 'absolute',
        top: theme.spacing.md,
        right: theme.spacing.md
      })}
    >
      <MdClose size={24} color={myTheme.colors!.brand![0]} />
    </ActionIcon>
  )
}
