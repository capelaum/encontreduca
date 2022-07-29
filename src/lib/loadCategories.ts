import { api } from 'services/api'
import { CategoryType } from 'types/resources'

export async function loadCategories(): Promise<CategoryType[]> {
  const { data } = await api.get('categories')

  if (!data) {
    throw new Error('No categories data returned from API')
  }

  return data
}
