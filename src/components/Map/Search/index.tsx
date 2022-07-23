import { Group, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { Filters } from './Filters'
import { SearchGroup } from './SearchGroup'

export function Search() {
  // const { colorScheme } = useMantineColorScheme()
  // const dark = colorScheme === 'dark'

  const theme = useMantineTheme()

  const largeScreen = useMediaQuery('(min-width: 768px)', false)

  return (
    <Group
      direction={largeScreen ? 'row' : 'column'}
      spacing="md"
      align="left"
      noWrap
      sx={{
        width: largeScreen ? '100%' : '100vw',
        position: 'absolute',
        top: theme.spacing.md,
        left: theme.spacing.md
      }}
    >
      <SearchGroup />

      <Filters />
    </Group>
  )
}
