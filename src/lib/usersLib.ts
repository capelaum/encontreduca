import { api } from 'services/api'
import { UpdatedUser, User } from 'types/users'

export async function getAuthUser() {
  const response = await api.get('user')

  const { data }: { data: User } = response

  return data
}

export async function getUser(userId: number): Promise<User | null> {
  const response = await api.get(`users/${userId}`)

  if (response.status !== 200) {
    throw new Error('An error occurred while fetching user')
  }

  const { data } = response

  return data
}

export async function updateUser({
  userId,
  updatedUser
}: {
  userId: number
  updatedUser: UpdatedUser
}) {
  const response = await api.put(`users/${userId}`, updatedUser)

  if (response.status !== 200) {
    throw new Error('An error occurred while updating the user')
  }

  const { data } = response

  return data
}

export async function deleteUser(userId: number) {
  const response = await api.delete(`users/${userId}`)

  if (response.status !== 200) {
    throw new Error('An error occurred while deleting the user')
  }

  const { data } = response

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
    userId,
    resourceId
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
  const response = await api.delete(`users/${userId}/avatar`)

  if (response.status !== 200) {
    throw new Error('Something went wrong while deleting user avatar')
  }

  return response
}
