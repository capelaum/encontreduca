import {
  CloseButton,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

interface CloseButtonProps {
  onClick: () => void
  title: string
}

export function DefaultCloseButton({ onClick, title }: CloseButtonProps) {
  const largeScreen = useMediaQuery('(min-width: 768px)', false)

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <CloseButton
      onClick={onClick}
      size="lg"
      title={title}
      aria-label={title}
      iconSize={24}
      color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}
      sx={{
        position: 'absolute',
        top: largeScreen ? theme.spacing.md : theme.spacing.sm,
        right: largeScreen ? theme.spacing.md : theme.spacing.sm,
        backgroundColor: dark ? theme.colors.brand[7] : theme.colors.gray[0],
        '&:hover': {
          backgroundColor: dark ? theme.colors.brand[8] : theme.colors.gray[1]
        }
      }}
    />
  )
}
