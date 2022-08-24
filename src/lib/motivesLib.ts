import { api } from 'services/api'

export async function loadMotives() {
  const { data } = await api.get('motives')

  if (!data) {
    throw new Error('No motives data returned from API')
  }

  return data
}
