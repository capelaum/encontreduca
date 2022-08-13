import { showToastError } from 'components/Shared/ToastMessage'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { api, headers } from 'services/api'
import { LoginFormValues, RegisterFormValues } from 'types/forms'
import { User } from 'types/users'

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
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthLoading, setIsAuthLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const authUserCookieName = 'encontreduca_user_auth'

  function getCookieAuth() {
    return getCookie(authUserCookieName)
      ? `Bearer ${getCookie(authUserCookieName)}`
      : ''
  }

  const getAuthUser = useCallback(async () => {
    try {
      const response = await api.get('user', {
        headers: {
          ...headers,
          Authorization: getCookieAuth()
        }
      })

      if (response.status !== 200) {
        throw new Error('Ocorreu um erro ao buscar o usuário')
      }

      const { data }: { data: User } = response

      return data
    } catch (error) {
      return null
    }
  }, [user])

  useEffect(() => {
    ;(async () => {
      const authUser = await getAuthUser()

      if (authUser) {
        setUser(authUser)
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
        description: (error as Error).message
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
      console.log('🚀 ~ error', error)

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

      setUser(null)

      deleteCookie('encontreduca_user_auth')
    } catch (error) {
      showToastError({
        title: 'Ooops, erro ao realizar logout',
        description: 'Por favor, tente novamente mais tarde.'
      })
    }
  }

  const authContextProviderValues = {
    user,
    setUser,
    register,
    login,
    logout,
    isAuthLoading
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
