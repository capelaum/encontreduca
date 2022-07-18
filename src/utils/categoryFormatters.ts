import { ReactNode } from 'react'
import { Category } from 'types/selectData'
import { categorySwitch } from './categorySwitch'

export type CategoryFilter = {
  filter: string
  icon: ReactNode
  iconDark: ReactNode
}

export const getCategoryFilters = (categories: Category[]) => {
  const categoryFilters = categories.reduce((acc, category) => {
    const foundValue = acc.find(
      (item) => item.filter === categorySwitch[category.name].filter
    )

    if (!foundValue) {
      acc.push({
        filter: categorySwitch[category.name].filter,
        icon: categorySwitch[category.name].icon,
        iconDark: categorySwitch[category.name].iconDark
      })
    }

    return acc
  }, [] as CategoryFilter[])

  return categoryFilters
}
