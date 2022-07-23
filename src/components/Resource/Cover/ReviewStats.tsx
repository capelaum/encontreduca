import { Group, Text, useMantineColorScheme } from '@mantine/core'
import { Stars } from 'components/Shared/Stars'

export function ReviewStats() {
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <Group align="center" spacing="sm">
      <Text size="sm" mt="xs">
        4,2
      </Text>

      <Group spacing={2}>
        <Stars />
      </Group>

      <Text
        size="sm"
        mt="xs"
        sx={(theme) => ({
          fontWeight: 500,
          color: dark ? theme.colors.cyan[3] : theme.colors.brand[9]
        })}
      >
        20 avaliações
      </Text>
    </Group>
  )
}
