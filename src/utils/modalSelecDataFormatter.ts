import { Category, ModalSelectData, Motive } from 'types/selectData'

export const getModalSelectDataMotives = (motives: Motive[], type: string) => {
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

export const getModalSelectDataCategories = (categories: Category[]) => {
  const resourceCategories = categories.reduce((acc, category) => {
    acc.push({
      value: category.id.toString(),
      label: category.name
    })

    return acc
  }, [] as ModalSelectData[])

  return resourceCategories
}
