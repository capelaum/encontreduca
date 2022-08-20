/* eslint-disable @typescript-eslint/no-unused-vars */
import { Group, useMantineTheme } from '@mantine/core'
import { Filters } from './Filters'
import { SearchGroup } from './SearchGroup'

export function Search() {
  const theme = useMantineTheme()

  return (
    <Group
      spacing="md"
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
