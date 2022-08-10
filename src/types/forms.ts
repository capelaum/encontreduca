import { NewResource } from './resources'

export type ResourceFormValues = Omit<NewResource, 'userId'>

export interface ProfileFormValues {
  name: string
  email: string
  password: string
  confirmPassword: string
  avatarUrl: string | null
}

export interface LoginFormValues {
  email: string
  password: string
}

export interface ForgotFormValues {
  email: string
}

export interface RegisterFormValues {
  name: string
  email: string
  password: string
  confirmPassword: string
}
