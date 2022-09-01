import { api } from 'services/api'
import { LoginProvider } from 'types/forms'
import { ResourceVote } from 'types/resources'
import { User } from 'types/users'

export async function getAuthUser() {
  const response = await api.get('user')

  if (response.status !== 200) {
    throw new Error('User not found')
  }

  const { data }: { data: User } = response

  return data
}

export async function loginWithProvider({
  accessToken,
  provider
}: LoginProvider) {
  try {
    const response = await api.post(`login/${provider}`, { accessToken })

    const { token, message } = response.data

    return { token, message }
  } catch (error) {
    return { token: null, message: (error as any).response.data.message }
  }
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
  updatedUser: FormData
}) {
  const response = await api.post(`users/${userId}?_method=PUT`, updatedUser, {
    headers: {
      withCredentials: true,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      'X-Requested-With': 'XMLHttpRequest'
    }
  })

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

export async function createUserResource(resourceId: number) {
  const response = await api.post('resource/user', {
    resourceId
  })

  const { data } = response

  if (response.status !== 201 || !data) {
    throw new Error('Something went wrong while creating user resource')
  }

  return data
}

export async function deleteUserResource(resourceId: number) {
  const response = await api.delete(`resource/user/${resourceId}`)

  if (response.status !== 204) {
    throw new Error('Something went wrong while deleting user resource')
  }

  return response
}

export async function deleteUserAvatar(userId: number) {
  const response = await api.delete(`users/${userId}/avatar`)

  if (response.status !== 204) {
    throw new Error('Something went wrong while deleting user avatar')
  }

  return response
}

export async function getUserVotes(): Promise<ResourceVote[] | null> {
  const response = await api.get('users/votes')

  if (response.status !== 200) {
    throw new Error('Something went wrong while fetching user votes')
  }

  const { data } = response

  return data
}
