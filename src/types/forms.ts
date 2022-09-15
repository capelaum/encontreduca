import { UseFormReturnType } from '@mantine/form'
import { LatLngLiteral } from './googleMaps'

export type ResourceFormValues = {
  name: string
  address: string
  website: string
  phone: string
  categoryId: string
  position: LatLngLiteral
  cover: string | null
}

export interface ProfileFormValues {
  name: string
  email: string
  password: string
  confirmPassword: string
  avatar: File | null
}

export type LoginFormValues = Pick<ProfileFormValues, 'email' | 'password'>

export type ForgotPasswordFormValues = Pick<ProfileFormValues, 'email'>

export type RegisterFormValues = Omit<ProfileFormValues, 'avatar'>

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

export type LoginProvider = {
  accessToken: string
  provider: string
}
