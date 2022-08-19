import { UseFormReturnType } from '@mantine/form'
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

export type ForgotPasswordFormValues = Pick<ProfileFormValues, 'email'>

export type RegisterFormValues = Omit<ProfileFormValues, 'avatarUrl'>

export interface ResetPasswordFormValues {
  token: string
  email: string
  password: string
  confirmPassword: string
}

export type FormType = 'login' | 'register' | 'forgotPassword' | 'resetPassword'

export type PasswordFormTypes = UseFormReturnType<
  | RegisterFormValues
  | LoginFormValues
  | ProfileFormValues
  | ResetPasswordFormValues
>
