import { api } from 'services/api'

export async function getUser(userId: number) {
  const { data } = await api.get(`users/${userId}`)

  if (!data) {
    throw new Error('No user data returned from API')
  }

  return data
}

export async function createUserResource({
  userId,
  resourceId
}: {
  userId: number
  resourceId: number
}) {
  const response = await api.post('users/resources', {
    user_id: userId,
    resource_id: resourceId
  })

  const { data } = response

  if (response.status !== 201 || !data) {
    throw new Error('Something went wrong while creating user resource')
  }

  return data
}

export async function deleteUserResource({
  userId,
  resourceId
}: {
  userId: number
  resourceId: number
}) {
  const response = await api.delete(`users/${userId}/resources/${resourceId}`)

  if (response.status !== 200) {
    throw new Error('Something went wrong while deleting user resource')
  }

  return response
}
