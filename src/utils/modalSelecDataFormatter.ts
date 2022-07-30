import { CategoryType } from 'types/categories'
import { ModalSelectData, Motive } from 'types/motives'

export const getMotivesSelectData = (motives: Motive[], type: string) => {
  const reviewMotives = motives.reduce((acc, motive) => {
    if (motive.type === type) {
      acc.push({
        value: motive.id.toString(),
        label: motive.name
      })
    }

    return acc
  }, [] as ModalSelectData[])

  return reviewMotives
}

export const getCategoriesSelectData = (categories: CategoryType[]) => {
  const resourceCategories = categories.reduce((acc, category) => {
    acc.push({
      value: category.id.toString(),
      label: category.name
    })

    return acc
  }, [] as ModalSelectData[])

  return resourceCategories
}
