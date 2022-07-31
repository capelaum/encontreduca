import { api } from 'services/api'

export async function getUser(userId: number) {
  const { data } = await api.get(`users/${userId}`)

  if (!data) {
    throw new Error('No user data returned from API')
  }

  return data
}
