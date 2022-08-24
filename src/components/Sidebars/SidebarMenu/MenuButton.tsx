import {
  Group,
  Text,
  UnstyledButton,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'

interface MenuButtonProps {
  text: string
  icon: React.ReactElement
  onClick?: () => void
}

export function MenuButton({ text, icon, onClick }: MenuButtonProps) {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <UnstyledButton
      onClick={onClick}
      sx={{
        color: dark ? theme.colors.cyan[3] : theme.colors.brand[7],
        textAlign: 'left',
        paddingTop: 14,
        paddingBottom: 14,
        paddingRight: theme.spacing.md,
        paddingLeft: theme.spacing.md,
        '&:hover': {
          color: dark ? theme.colors.brand[7] : theme.white,
          backgroundColor: dark ? theme.colors.cyan[3] : theme.colors.brand[7]
        }
      }}
    >
      <Group spacing="md" align="center">
        {icon}
        <Text size="lg" weight={400}>
          {text}
        </Text>
      </Group>
    </UnstyledButton>
  )
}
