import {
  Button,
  CSSObject,
  Group,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useState } from 'react'
import { CategoryType } from 'types/resources'
import { CategoryFilter, getCategoryFilters } from 'utils/categoryFormatters'

interface FiltersProps {
  categories: CategoryType[]
}

export function Filters({ categories }: FiltersProps) {
  const categoryFilters = getCategoryFilters(categories)

  const largeScreen = useMediaQuery('(min-width: 768px)', false)
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const [activeFilter, setActiveFilter] = useState('')

  const filterGroupStyles = (): CSSObject => ({
    zIndex: 1,
    width: largeScreen ? 'calc(100vw - 420px)' : '100%',
    overflow: 'hidden',
    overflowX: 'scroll',
    overflowY: 'hidden',
    whiteSpace: 'nowrap',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  })

  const setFilterColors = (isActive: boolean) => {
    if (dark && isActive) {
      return {
        color: theme.colors.brand[7],
        backgroundColor: theme.colors.cyan[3],
        '&:hover': { backgroundColor: theme.colors.cyan[4] }
      }
    }

    if (dark && !isActive) {
      return {
        color: theme.colors.cyan[3],
        backgroundColor: theme.colors.brand[7],
        '&:hover': { backgroundColor: theme.colors.brand[8] }
      }
    }

    if (!dark && isActive) {
      return {
        color: theme.white,
        backgroundColor: theme.colors.brand[7],
        '&:hover': { backgroundColor: theme.colors.brand[7] }
      }
    }

    return {
      color: theme.colors.brand[7],
      backgroundColor: theme.white,
      '&:hover': { backgroundColor: theme.colors.gray[0] }
    }
  }

  const setFilterIcon = (categoryFilter: CategoryFilter, isActive: boolean) => {
    if (dark && isActive) {
      return categoryFilter.iconBlue
    }

    if (dark && !isActive) {
      return categoryFilter.iconCyan
    }

    if (!dark && isActive) {
      return categoryFilter.iconWhite
    }

    return categoryFilter.iconBlueDark
  }

  return (
    <Group
      noWrap
      align="center"
      position="left"
      sx={filterGroupStyles}
      spacing="xs"
    >
      {categoryFilters.map((category) => (
        <Button
          key={category.filter}
          value={category.filter}
          size="xs"
          radius={theme.radius.xl}
          onClick={() => setActiveFilter(category.filter)}
          leftIcon={setFilterIcon(category, activeFilter === category.filter)}
          sx={{
            ...setFilterColors(activeFilter === category.filter),
            '&:focus': { outline: 'white', border: 'white' },
            boxShadow: dark ? 'none' : '0 1px 4px rgba(0, 0, 0, 0.3)',
            fontWeight: 400
          }}
        >
          <Text size="sm">{category.filter}</Text>
        </Button>
      ))}
    </Group>
  )
}
