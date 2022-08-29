import { ResourceVote } from './resources'

export type User = {
  id: string | number
  name: string
  email: string
  avatarUrl: string | null
  password: string
  reviewCount: number
  resourcesIds: number[]
  votes: ResourceVote[]
}

export type UpdatedUser = {
  name: string
  email: string
  password: string | null
  confirmPassword: string | null
  avatarUrl: File | null
}
