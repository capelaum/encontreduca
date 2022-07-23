import { Group, Text, useMantineColorScheme } from '@mantine/core'
import { categorySwitch } from 'utils/categorySwitch'

interface CategoryProps {
  category: string
  isSmall?: boolean
}

export function Category({ category, isSmall }: CategoryProps) {
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { iconCyan, iconBlueDark } = categorySwitch[category]

  return (
    <Group align="center" spacing="sm">
      {dark ? iconCyan : iconBlueDark}

      <Text size={isSmall ? 'sm' : 'md'}>{category}</Text>
    </Group>
  )
}
