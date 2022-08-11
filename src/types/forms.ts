import { NewResource } from './resources'

export type ResourceFormValues = Omit<NewResource, 'userId'>

export interface ProfileFormValues {
  name: string
  email: string
  password: string
  confirmPassword: string
  avatarUrl: string | null
}

export type LoginFormValues = Pick<ProfileFormValues, 'email' | 'password'>

export type ForgotFormValues = Pick<ProfileFormValues, 'email'>

export type RegisterFormValues = Omit<ProfileFormValues, 'avatarUrl'>

export type FormType = 'login' | 'register' | 'forgotPassword'
