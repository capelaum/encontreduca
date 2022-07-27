import {
  Group,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { categorySwitch } from 'utils/categorySwitch'

interface CategoryProps {
  category: string
  isSmall?: boolean
}

export function Category({ category, isSmall }: CategoryProps) {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { iconCyan, iconBlueDark } = categorySwitch[category]

  return (
    <Group align="center" spacing="sm">
      {dark ? iconCyan : iconBlueDark}

      <Text
        color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}
        size={isSmall ? 'sm' : 'md'}
      >
        {category}
      </Text>
    </Group>
  )
}
