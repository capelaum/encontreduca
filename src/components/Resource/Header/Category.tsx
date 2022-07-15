import { Group, Text } from '@mantine/core'
import { categorySwitch } from 'utils/categorySwitch'

interface CategoryProps {
  category: string
}

export function Category({ category }: CategoryProps) {
  const { icon } = categorySwitch[category]

  return (
    <Group align="center" spacing="sm">
      {icon}

      <Text size="sm" pt={2}>
        {category}
      </Text>
    </Group>
  )
}
