import { ActionIcon } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { MdClose } from 'react-icons/md'
import { myTheme } from 'styles/theme'

interface CloseButtonProps {
  onClick: () => void
}

export function CloseButton({ onClick }: CloseButtonProps) {
  const largeScreen = useMediaQuery('(min-width: 768px)')

  return (
    <ActionIcon
      variant="hover"
      size={largeScreen ? 'lg' : 'md'}
      color="brand"
      onClick={onClick}
      title="Fechar Menu"
      sx={(theme) => ({
        color: theme.colors.cyan[3],
        position: 'absolute',
        top: largeScreen ? theme.spacing.md : theme.spacing.sm,
        right: largeScreen ? theme.spacing.md : theme.spacing.sm
      })}
    >
      <MdClose size={24} color={myTheme.colors!.brand![0]} />
    </ActionIcon>
  )
}
