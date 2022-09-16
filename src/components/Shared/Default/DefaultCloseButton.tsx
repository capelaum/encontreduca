import {
  CloseButton,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'

interface CloseButtonProps {
  onClick: () => void
  title: string
}

export function DefaultCloseButton({ onClick, title }: CloseButtonProps) {
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
      sx={{
        position: 'absolute',
        color: dark ? theme.colors.cyan[3] : theme.colors.brand[7],
        top: theme.spacing.md,
        right: theme.spacing.md,
        backgroundColor: dark ? theme.colors.brand[7] : theme.colors.gray[0],
        '&:hover': {
          backgroundColor: dark ? theme.colors.brand[8] : theme.colors.gray[1]
        }
      }}
    />
  )
}
