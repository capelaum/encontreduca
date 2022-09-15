import { Group, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { Filters } from './Filters'
import { SearchGroup } from './SearchGroup'

export function Search() {
  const theme = useMantineTheme()

  const largeScreen = useMediaQuery('(min-width: 768px)', false)

  return (
    <Group
      spacing={largeScreen ? 'lg' : 'sm'}
      align="left"
      sx={{
        width: 'calc(100vw - 20px)',
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
