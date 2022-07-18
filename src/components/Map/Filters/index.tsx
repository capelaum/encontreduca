import {
  Chip,
  Chips,
  createStyles,
  CSSObject,
  Group,
  Text
} from '@mantine/core'
import data from 'data/categories.json'
import { useState } from 'react'
import { getCategoryFilters } from 'utils/categoryFormatters'

const useStyles = createStyles((theme, _params, getRef) => ({
  iconWrapper: {
    ref: getRef('iconWrapper')
  },

  checked: {
    backgroundColor: `${theme.colors.cyan[3]} !important`,
    color: theme.colors.brand[7],

    [`& .${getRef('iconWrapper')}`]: {
      display: 'none'
    }
  }
}))

export function Filters() {
  const { classes } = useStyles()
  const { categories } = data
  const categoryFilters = getCategoryFilters(categories)

  const [activeFilter, setActiveFilter] = useState('')

  const chipsStyles = (): CSSObject => ({
    position: 'absolute',
    top: '28px',
    left: '420px',
    zIndex: 1,
    width: 'calc(100vw - 420px)',
    overflow: 'hidden',
    overflowX: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  })

  return (
    <Chips
      noWrap
      value={activeFilter}
      multiple={false}
      onChange={setActiveFilter}
      size="sm"
      spacing="xs"
      radius="xl"
      variant="filled"
      classNames={classes}
      sx={chipsStyles}
    >
      {categoryFilters.map((category) => (
        <Chip key={category.filter} value={category.filter}>
          <Group
            noWrap
            align="center"
            position="center"
            spacing="sm"
            sx={{
              height: '100%',
              '&:focus': { outline: 'white', border: 'white' }
            }}
          >
            {activeFilter === category.filter
              ? category.iconDark
              : category.icon}

            <Text size="sm" sx={{ lineHeight: 1 }}>
              {category.filter}
            </Text>
          </Group>
        </Chip>
      ))}
    </Chips>
  )
}
