export type User = {
  id: string | number
  name: string
  email: string
  avatarUrl: string | null
  password: string
  reviewCount: number
  resourcesIds: number[]
}

export type UpdatedUser = {
  name: string
  email: string
  password: string | null
  avatarUrl: string | null
}

export interface ProfileFormValues {
  name: string
  email: string
  password: string
  confirmPassword: string
  avatarUrl: string | null
}
