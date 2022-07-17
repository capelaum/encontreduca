import { Group, Text } from '@mantine/core'
import { categorySwitch } from 'utils/categorySwitch'

interface CategoryProps {
  category: string
  isSmall?: boolean
}

export function Category({ category, isSmall }: CategoryProps) {
  const { icon } = categorySwitch[category]

  return (
    <Group align="center" spacing="sm">
      {icon}

      <Text size={isSmall ? 'sm' : 'md'} pt={2}>
        {category}
      </Text>
    </Group>
  )
}
