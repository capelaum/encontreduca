import { ReactNode } from 'react'
import { Category } from 'types/selectData'
import { categorySwitch } from './categorySwitch'

export type CategoryFilter = {
  filter: string
  iconCyan: ReactNode
  iconWhite: ReactNode
  iconBlue: ReactNode
  iconBlueDark: ReactNode
}

export const getCategoryFilters = (categories: Category[]) => {
  const categoryFilters = categories.reduce((acc, category) => {
    const foundValue = acc.find(
      (item) => item.filter === categorySwitch[category.name].filter
    )

    if (!foundValue) {
      acc.push({
        filter: categorySwitch[category.name].filter,
        iconCyan: categorySwitch[category.name].iconCyan,
        iconWhite: categorySwitch[category.name].iconWhite,
        iconBlue: categorySwitch[category.name].iconBlue,
        iconBlueDark: categorySwitch[category.name].iconBlueDark
      })
    }

    return acc
  }, [] as CategoryFilter[])

  return categoryFilters
}
