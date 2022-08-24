import { deleteCookie, hasCookie } from 'cookies-next'
import { api } from 'services/api'
import { ResourceVote } from 'types/resources'
import { UpdatedUser, User } from 'types/users'

export async function getAuthUser() {
  try {
    const response = await api.get('user')

    if (response.status !== 200) {
      throw new Error('User not found')
    }

    const { data }: { data: User } = response

    return data
  } catch (error) {
    if (hasCookie('encontreduca_user_auth')) {
      deleteCookie('encontreduca_user_auth')
    }
    return null
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

export async function deleteUserAvatar({ userId }: { userId: number }) {
  const response = await api.delete(`users/${userId}/avatar`)

  if (response.status !== 200) {
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
