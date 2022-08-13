import { useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { showToast, showToastError } from 'components/Shared/ToastMessage'
import { deleteCookie, hasCookie, setCookie } from 'cookies-next'
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
import { useSidebar } from './sidebarContext'

interface AuthProviderProps {
  children: ReactNode
}

interface AuthContextData {
  user: User | null
  setUser: (user: User | null) => void
  register: (form: RegisterFormValues) => Promise<User | null>
  login: (form: LoginFormValues) => Promise<User | null>
  logout: () => void
  isAuthLoading: boolean
  sendResetPasswordLink: (email: string) => Promise<boolean>
  resetPassword: (form: ResetPasswordFormValues) => Promise<boolean>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthLoading, setIsAuthLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const { setAuthSidebarOpened } = useSidebar()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const authUserCookieName = 'encontreduca_user_auth'

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        setUser(null)
        setAuthSidebarOpened(false)

        showToastError({
          title: 'Erro de autenticação',
          description: 'Sua sessão expirou, faça login novamente'
        })
      }

      return Promise.reject(error)
    }
  )

  const getAuthUser = useCallback(async () => {
    try {
      const response = await api.get('user')

      if (response.status !== 200) {
        throw new Error('Ocorreu um erro ao buscar o usuário')
      }

      const { data }: { data: User } = response

      return data
    } catch (error) {
      return null
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      if (hasCookie(authUserCookieName)) {
        const authUser = await getAuthUser()

        if (authUser) {
          setUser(authUser)
        }
      }
    })()
  }, [])

  const register = async (
    registerFormValues: RegisterFormValues
  ): Promise<User | null> => {
    setIsAuthLoading(true)

    try {
      const response = await api.post('register', registerFormValues)

      if (response.status !== 201) {
        throw new Error('Ocorreu um erro ao tentar cadastrar usuário')
      }

      setIsAuthLoading(false)

      const { data }: { data: User } = response

      return data
    } catch (error) {
      setIsAuthLoading(false)

      showToastError({
        title: 'Ooops, ocorreu um erro ao tentar te cadastrar',
        description: (error as any).response.data.message
      })

      return null
    }
  }

  const login = async (loginFormValues: LoginFormValues) => {
    setIsAuthLoading(true)

    try {
      const response = await api.post('login', loginFormValues)

      if (response.status !== 200) {
        throw new Error('Ocorreu um erro ao fazer o login')
      }

      const { token } = response.data

      if (!token) {
        throw new Error('Ocorreu um erro ao criar o token')
      }

      setCookie(authUserCookieName, token, {
        maxAge: 30 * 24 * 60 * 60,
        sameSite: 'lax'
      })

      const authUser = await getAuthUser()

      if (!authUser) {
        throw new Error('Ocorreu um erro ao buscar o usuário')
      }

      setUser(authUser)

      setIsAuthLoading(false)

      return authUser
    } catch (error) {
      setIsAuthLoading(false)

      showToastError({
        title: 'Ooops, erro ao fazer login',
        description: 'Credenciais inválidas'
      })

      return null
    }
  }

  const logout = async () => {
    try {
      await api.post('/logout')

      deleteCookie('encontreduca_user_auth')

      showToast({
        title: 'Logout realizado com sucesso',
        description: `Até a proxima ${user?.name} 👋`,
        icon: <MdLogout size={24} color={theme.colors.brand[7]} />,
        dark
      })

      setUser(null)
    } catch (error) {
      showToastError({
        title: 'Ooops, erro ao realizar logout',
        description: 'Por favor, tente novamente mais tarde...'
      })
    }
  }

  const sendResetPasswordLink = async (email: string) => {
    setIsAuthLoading(true)

    try {
      const response = await api.post('/forgot-password', { email })

      if (response.status !== 200) {
        throw new Error(
          'Ocorreu um erro ao enviar o link de recuperação de senha'
        )
      }

      setIsAuthLoading(false)

      const { status } = response.data

      showToast({
        title: status,
        description:
          'Por favor verifique seu email e siga as instruções para recuperar sua sennha',
        icon: (
          <MdOutlineMarkEmailRead size={24} color={theme.colors.brand[7]} />
        ),
        dark
      })

      return true
    } catch (error) {
      setIsAuthLoading(false)

      showToastError({
        title: 'Ooops, erro ao enviar link de recuperação de senha',
        description: 'Por favor, tente novamente mais tarde...'
      })

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

      if (response.status !== 200) {
        throw new Error('Ocorreu um erro ao resetar a senha')
      }

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

      showToastError({
        title: 'Ooops, erro ao resetar senha',
        description: 'Por favor, tente novamente mais tarde...'
      })

      return false
    }
  }

  const authContextProviderValues = {
    user,
    setUser,
    register,
    login,
    logout,
    isAuthLoading,
    sendResetPasswordLink,
    resetPassword
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
