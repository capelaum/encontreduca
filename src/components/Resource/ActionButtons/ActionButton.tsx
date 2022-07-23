import { ActionIcon, Stack, Text, useMantineColorScheme } from '@mantine/core'

interface ActionButtonProps {
  icon: React.ReactElement
  text: string
  onClick?: () => void
}

export function ActionButton({ text, icon, onClick }: ActionButtonProps) {
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <Stack
      spacing="sm"
      align="center"
      justify="start"
      sx={{ maxWidth: '72px' }}
    >
      <ActionIcon
        onClick={onClick}
        variant="outline"
        size="xl"
        title={text}
        radius="md"
        sx={(theme) => ({
          color: dark ? theme.colors.cyan[3] : theme.colors.brand[9],
          border: `1px solid${
            dark ? theme.colors.cyan[3] : theme.colors.brand[9]
          }`
        })}
      >
        {icon}
      </ActionIcon>
      <Text size="sm" align="center" sx={{ fontWeight: 600 }}>
        {text}
      </Text>
    </Stack>
  )
}
