import { CategoryFilter, CategoryType } from 'types/categories'
import { categorySwitch } from './categorySwitch'

export const getCategoryFilters = (categories: CategoryType[]) => {
  const categoryFilters = categories.reduce((acc, category) => {
    if (!categorySwitch[category.name]?.filter) {
      return acc
    }

    const foundFilter = acc.find(
      (item) => item.name === categorySwitch[category.name].filter
    )

    if (foundFilter) {
      foundFilter.categoryNames.push(category.name)
    }

    if (!foundFilter) {
      acc.push({
        categoryNames: [category.name],
        name: categorySwitch[category.name].filter,
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
