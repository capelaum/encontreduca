import {
  ActionIcon,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { MdClose } from 'react-icons/md'

interface CloseButtonProps {
  onClick: () => void
}

export function CloseButton({ onClick }: CloseButtonProps) {
  const largeScreen = useMediaQuery('(min-width: 768px)', false)

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <ActionIcon
      variant="hover"
      size={largeScreen ? 'lg' : 'md'}
      onClick={onClick}
      title="Fechar Menu"
      sx={{
        position: 'absolute',
        top: largeScreen ? theme.spacing.md : theme.spacing.sm,
        right: largeScreen ? theme.spacing.md : theme.spacing.sm,
        backgroundColor: dark ? theme.colors.brand[7] : theme.colors.gray[0],
        '&:hover': {
          backgroundColor: dark ? theme.colors.brand[8] : theme.colors.gray[1]
        }
      }}
    >
      <MdClose
        size={24}
        color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}
      />
    </ActionIcon>
  )
}
