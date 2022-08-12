import { showToastError } from 'components/Shared/ToastMessage'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { api } from 'services/api'
import useSWR from 'swr'
import { LoginFormValues, RegisterFormValues } from 'types/forms'

interface AuthProps {
  middleware: string
}

export const useAuth = ({ middleware }: AuthProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const getAuthUser = async () => {
    try {
      const res = await api.get('user')

      if (res.status !== 200) {
        throw new Error('Ocorreu um erro ao buscar o usuário')
      }

      const { data } = res
      // console.log('🚀 ~ getAuthUser data', data)

      return data
    } catch (error) {
      // console.log('🚀 ~ getAuthUser error', error)
      return null
    }
  }

  const {
    data: user,
    error: userError,
    mutate
  } = useSWR('get-auth-user', getAuthUser)

  useEffect(() => {
    if (middleware === 'auth' && userError) {
      console.error("User doesn't exist")
    }
  }, [user, userError])

  const csrf = async () => api.get('csrf-cookie')

  const register = async (registerFormValues: RegisterFormValues) => {
    setIsLoading(true)

    try {
      await csrf()

      const response = await api.post('register', registerFormValues)

      if (response.status !== 201) {
        throw new Error('Ocorreu um erro ao tentar cadastrar usuário')
      }

      setIsLoading(false)

      return response
    } catch (error) {
      setIsLoading(false)

      const { response } = error as any

      showToastError({
        title: 'Ooops, erro ao cadastrar',
        description: Object.values(response.data.errors).flat().join('\n')
      })

      return null
    }
  }

  const login = async (loginFormValues: LoginFormValues) => {
    setIsLoading(true)

    try {
      await csrf()

      const response = await api.post('login', loginFormValues)

      if (response.status !== 200) {
        throw new Error('Ocorreu um erro ao tentar fazer login')
      }

      await mutate()

      setIsLoading(false)

      return response
    } catch (error) {
      setIsLoading(false)
      console.log('🚀 ~ error', error)

      if ((error as any).response.data.message) {
        showToastError({
          title: 'Ooops, erro ao fazer login',
          description: (error as any).response.data.message
        })

        return null
      }

      showToastError({
        title: 'Ooops, erro ao fazer login',
        description: Object.values((error as any).response.data.errors)
          .flat()
          .join('\n')
      })

      return null
    }
  }

  const logout = async () => {
    await api.post('/logout')

    mutate(null)

    router.push('/')
  }

  return {
    isLoading,
    user,
    register,
    login,
    logout
  }
}
