import { api } from 'services/api'
import { UpdatedUser, User } from 'types/users'

export async function getUser(userId: number): Promise<User> {
  const { data } = await api.get(`users/${userId}`)

  if (!data) {
    throw new Error('No user data returned from API')
  }

  return data
}

export async function updateUser({
  userId,
  updatedUser
}: {
  userId: number
  updatedUser: UpdatedUser
}) {
  const { data } = await api.put(`users/${userId}`, updatedUser)

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

export async function deleteUserAvatar({ userId }: { userId: number }) {
  console.log('🚀 ~ userId', userId)

  const response = await api.delete(`users/${userId}/avatar`)
  console.log('🚀 ~ response', response)

  if (response.status !== 200) {
    throw new Error('Something went wrong while deleting user avatar')
  }

  return response
}
