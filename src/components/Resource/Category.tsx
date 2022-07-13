import { Group, Text } from '@mantine/core'
import { resourceCategories } from 'utils/resourceCategories'

interface CategoryProps {
  category: string
}

export function Category({ category }: CategoryProps) {
  const { name, icon } = resourceCategories[category]

  return (
    <Group align="center" spacing={8}>
      {icon}

      <Text size="sm" pt={2}>
        {name}
      </Text>
    </Group>
  )
}
