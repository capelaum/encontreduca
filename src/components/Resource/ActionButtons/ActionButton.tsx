import { ActionIcon, Stack, Text } from '@mantine/core'

interface ActionButtonProps {
  icon: React.ReactElement
  text: string
}

export function ActionButton({ text, icon }: ActionButtonProps) {
  return (
    <Stack spacing="sm" align="center" justify="start">
      <ActionIcon
        variant="outline"
        size="xl"
        radius="md"
        sx={(theme) => ({
          color: theme.colors.cyan[3],
          border: `1px solid${theme.colors.cyan[3]}`
        })}
      >
        {icon}
      </ActionIcon>
      <Text size="sm" align="center" sx={{ maxWidth: '60px' }}>
        {text}
      </Text>
    </Stack>
  )
}
