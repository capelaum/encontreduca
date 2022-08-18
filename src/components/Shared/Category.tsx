import {
  Group,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { categorySwitch } from 'utils/categorySwitch'

interface CategoryProps {
  categoryName: string | undefined
  isSmall?: boolean
}

export function Category({ categoryName, isSmall }: CategoryProps) {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { iconCyan, iconBlueDark } =
    categorySwitch[categoryName || 'Escola pública']

  return (
    <Group align="center" spacing="sm">
      {dark ? iconCyan : iconBlueDark}

      <Text
        color={dark ? theme.colors.gray[3] : theme.colors.gray[7]}
        size={isSmall ? 'sm' : 'md'}
      >
        {categoryName}
      </Text>
    </Group>
  )
}
