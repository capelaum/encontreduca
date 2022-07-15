import { Group, Text } from '@mantine/core'
import { Stars } from 'components/Shared/Stars'
import { myTheme } from 'styles/theme'

export function ReviewStats() {
  return (
    <Group align="center" spacing="sm">
      <Text size="sm" mt="xs">
        4,2
      </Text>

      <Group spacing={2}>
        <Stars />
      </Group>

      <Text size="sm" mt="xs" color={myTheme.colors!.brand![0]}>
        20 avaliações
      </Text>
    </Group>
  )
}
