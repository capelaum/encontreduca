import {
  Group,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { CategoryType } from 'types/categories'
import { categorySwitch } from 'utils/categorySwitch'

interface CategoryProps {
  category: CategoryType
  isSmall?: boolean
}

export function Category({ category, isSmall }: CategoryProps) {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { iconCyan, iconBlueDark } = categorySwitch[category.name]

  return (
    <Group align="center" spacing="sm">
      {dark ? iconCyan : iconBlueDark}

      <Text
        color={dark ? theme.colors.gray[3] : theme.colors.gray[7]}
        size={isSmall ? 'sm' : 'md'}
      >
        {category.name}
      </Text>
    </Group>
  )
}
