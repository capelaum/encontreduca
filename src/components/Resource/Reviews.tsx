import { Group, Text } from '@mantine/core'
import { MdStar, MdStarBorder } from 'react-icons/md'
import { myTheme } from 'styles/theme'

export function Reviews() {
  return (
    <Group align="center" spacing={8}>
      <Text size="sm" mt={4}>
        4,2
      </Text>

      <Group spacing={2}>
        <MdStar size={18} color="yellow" />
        <MdStar size={18} color="yellow" />
        <MdStar size={18} color="yellow" />
        <MdStar size={18} color="yellow" />
        <MdStarBorder size={18} />
      </Group>

      <Text size="sm" mt={4} color={myTheme.colors!.brand![0]}>
        20 avaliações
      </Text>
    </Group>
  )
}
