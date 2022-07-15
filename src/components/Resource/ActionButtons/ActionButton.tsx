import { ActionIcon, Stack, Text } from '@mantine/core'

interface ActionButtonProps {
  icon: React.ReactElement
  text: string
  onClick?: () => void
}

export function ActionButton({ text, icon, onClick }: ActionButtonProps) {
  return (
    <Stack spacing="sm" align="center" justify="start">
      <ActionIcon
        onClick={onClick}
        variant="outline"
        size="xl"
        title={text}
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
