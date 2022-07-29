/* eslint-disable @typescript-eslint/no-unused-vars */
import { Group, useMantineTheme } from '@mantine/core'
import { CategoryType } from 'types/categories'
import { Filters } from './Filters'
import { SearchGroup } from './SearchGroup'

interface SearchProps {
  categories: CategoryType[]
}

export function Search({ categories }: SearchProps) {
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

      <Filters categories={categories} />
    </Group>
  )
}
