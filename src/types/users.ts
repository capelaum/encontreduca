export type User = {
  id: string | number
  name: string
  email: string
  avatar_url: string | null
  password: string
  created_at: string
  updated_at: string
  resource_count?: number
  review_count?: number
  resourcesIds: number[]
}

export type UpdatedUser = {
  name: string
  email: string
  password: string | null
  avatar_url: string | null
}

export interface ProfileFormValues {
  name: string
  email: string
  password: string
  confirmPassword: string
  avatarUrl: string | null
}
