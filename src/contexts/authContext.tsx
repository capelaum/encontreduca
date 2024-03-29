import { useMantineColorScheme, useMantineTheme } from '@mantine/core'
import axios from 'axios'
import { showToast, showToastError } from 'components/Shared/ToastMessage'
import { deleteCookie } from 'cookies-next'
import { signIn } from 'next-auth/react'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { MdDone, MdLogout, MdOutlineMarkEmailRead } from 'react-icons/md'
import { api } from 'services/api'
import {
  LoginFormValues,
  RegisterFormValues,
  ResetPasswordFormValues
} from 'types/forms'
import { User } from 'types/users'

interface AuthProviderProps {
  children: ReactNode
}

interface AuthContextData {
  user: User | null
  setUser: (user: User | null) => void
  register: (form: RegisterFormValues) => Promise<User | null>
  login: (form: LoginFormValues) => Promise<boolean>
  loginWithProvider: (provider: string) => Promise<boolean>
  logout: () => Promise<boolean>
  sendResetPasswordLink: (email: string) => Promise<boolean>
  resetPassword: (form: ResetPasswordFormValues) => Promise<boolean>
  resendEmailVerification: () => Promise<boolean>
  isAuthLoading: boolean
  authUserCookieName: string
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export type AuthError = {
  type: string
  message: string
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthLoading, setIsAuthLoading] = useState(false)
  const [errors, setErrors] = useState<AuthError[]>([])
  const [user, setUser] = useState<User | null>(null)

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const authUserCookieName = 'encontreduca_user_auth'

  const setCustomErrorMessage = (message: string) => {
    switch (message) {
      case 'Your email address is not verified.':
        return 'Seu email não foi verificado.'

      default:
        return message
    }
  }

  useEffect(() => {
    if (errors.length > 0) {
      errors.forEach((error) => {
        showToastError({
          title: `Ocorreu um erro ao ${error.type}`,
          description: setCustomErrorMessage(error.message)
        })
      })
    }
  }, [errors])

  const setAuthErrors = useCallback(
    (error: any, type: string) => {
      if (error.response?.data?.errors) {
        Object.values(error.response?.data.errors as string[])
          .flat()
          .forEach((errorMessage) => {
            setErrors((authErrors) => [
              ...authErrors,
              { message: errorMessage, type }
            ])
          })
      }

      if (error.response?.data?.message) {
        setErrors([
          {
            message: error.response.data.message,
            type
          }
        ])
      }

      if (error.response?.data?.email) {
        setErrors([
          {
            message: error.response.data.email,
            type
          }
        ])
      }
    },
    [errors]
  )

  const resendEmailVerification = async () => {
    setIsAuthLoading(true)
    try {
      await api.post('email/verify/resend')
      setIsAuthLoading(false)

      showToast({
        title: 'Verificação de email foi reenviada',
        description: `Verifique seu email para continuar`,
        icon: (
          <MdOutlineMarkEmailRead size={24} color={theme.colors.brand[7]} />
        ),
        dark
      })

      return true
    } catch (error) {
      setIsAuthLoading(false)

      setAuthErrors(error, 'reenviar email de verificação')

      return false
    }
  }

  const register = async (
    registerFormValues: RegisterFormValues
  ): Promise<User | null> => {
    setIsAuthLoading(true)

    try {
      const response = await api.post('register', registerFormValues)

      setIsAuthLoading(false)

      const { data }: { data: User } = response

      return data
    } catch (error) {
      setIsAuthLoading(false)

      setAuthErrors(error, 'cadastrar')

      return null
    }
  }

  const login = async (loginFormValues: LoginFormValues) => {
    setIsAuthLoading(true)

    try {
      const {
        data: { authUser, message }
      } = await axios.post('/api/auth/login', loginFormValues)

      setUser(authUser)

      setIsAuthLoading(false)

      showToast({
        title: 'Login realizado com sucesso',
        description: message,
        icon: <MdDone size={24} color={theme.colors.brand[7]} />,
        dark
      })

      return true
    } catch (error) {
      setIsAuthLoading(false)

      setAuthErrors(error, 'fazer login')

      if (
        (error as any).response?.status === 403 &&
        (error as any).response?.data?.message ===
          'Your email address is not verified.'
      ) {
        await resendEmailVerification()
      }

      deleteCookie(authUserCookieName)

      return false
    }
  }

  const loginWithProvider = async (provider: string) => {
    setIsAuthLoading(true)

    try {
      await signIn(provider)

      return true
    } catch (error) {
      setIsAuthLoading(false)

      setAuthErrors(error, `fazer login com o provedor do ${provider}`)

      return false
    }
  }

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout')

      showToast({
        title: 'Logout realizado com sucesso',
        description: `Até a proxima ${user?.name} 👋`,
        icon: <MdLogout size={24} color={theme.colors.brand[7]} />,
        dark
      })

      setUser(null)

      return true
    } catch (error) {
      setIsAuthLoading(false)

      setAuthErrors(error, 'fazer logout')

      return false
    }
  }

  const sendResetPasswordLink = async (email: string) => {
    setIsAuthLoading(true)

    try {
      const response = await api.post('/forgot-password', { email })

      setIsAuthLoading(false)

      const { status } = response.data

      showToast({
        title: status,
        description:
          'Verifique seu email e siga as instruções para recuperar sua sennha',
        icon: (
          <MdOutlineMarkEmailRead size={24} color={theme.colors.brand[7]} />
        ),
        dark
      })

      return true
    } catch (error) {
      setIsAuthLoading(false)

      setAuthErrors(error, 'recuperar sua senha')

      return false
    }
  }

  const resetPassword = async (
    resetPasswordFormValues: ResetPasswordFormValues
  ) => {
    setIsAuthLoading(true)

    try {
      const response = await api.post(
        '/reset-password',
        resetPasswordFormValues
      )

      setIsAuthLoading(false)

      const { status } = response.data

      showToast({
        title: status,
        description: 'Sua senha foi alterada com sucesso, faça login novamente',
        icon: <MdDone size={24} color={theme.colors.brand[7]} />,
        dark
      })

      return true
    } catch (error) {
      setIsAuthLoading(false)

      setAuthErrors(error, 'resetar sua senha')

      return false
    }
  }

  const authContextProviderValues = {
    user,
    setUser,
    register,
    login,
    loginWithProvider,
    logout,
    isAuthLoading,
    authUserCookieName,
    sendResetPasswordLink,
    resetPassword,
    resendEmailVerification
  }

  const authContextProviderValue = useMemo<AuthContextData>(
    () => ({ ...authContextProviderValues }),
    Object.values(authContextProviderValues)
  )

  return (
    <AuthContext.Provider value={authContextProviderValue}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextData => useContext(AuthContext)
