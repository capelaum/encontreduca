import { Text, useMantineColorScheme, useMantineTheme } from '@mantine/core'

interface ActionTextProps {
  text: string
  onClick: () => void
  size?: 'sm' | 'md' | 'lg'
}

export function ActionText({ text, onClick, size }: ActionTextProps) {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <Text
      mt="sm"
      size={size ?? 'md'}
      weight={500}
      sx={{
        cursor: 'pointer',
        display: 'inline-block',
        transition: 'all 0.2s',
        color: dark ? theme.colors.cyan[3] : theme.colors.brand[7],

        '&:hover': {
          color: dark ? theme.colors.cyan[2] : theme.colors.brand[9],
          textDecoration: 'underline'
        }
      }}
      onClick={onClick}
    >
      {text}
    </Text>
  )
}
