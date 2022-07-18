import { Chip, Group, Text } from '@mantine/core'
import { CategoryFilter } from 'utils/categoryFormatters'

interface FilterItemProps {
  category: CategoryFilter
  activeFilter: string
}

export function FilterItem({ category, activeFilter }: FilterItemProps) {
  return (
    <Chip key={category.filter} value={category.filter}>
      <Group
        noWrap
        align="center"
        position="center"
        spacing="sm"
        sx={{ height: '100%' }}
      >
        {activeFilter === category.filter ? category.iconDark : category.icon}

        <Text size="sm" sx={{ lineHeight: 1 }}>
          {category.filter}
        </Text>
      </Group>
    </Chip>
  )
}
