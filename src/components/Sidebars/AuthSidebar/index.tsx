import {
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { SidebarHeader } from 'components/Shared/SidebarHeader'
import { useSidebar } from 'contexts/sidebarContext'
import { useState } from 'react'
import { FormType } from 'types/forms'
import { ActionText } from './ActionText'
import { ForgotForm } from './ForgotForm'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'

export function AuthSidebar() {
  const [formType, setFormType] = useState<FormType>('login')

  const { setAuthSidebarOpened } = useSidebar()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const setHeaderTitle = () => {
    if (formType === 'login') {
      return 'Fazer Login'
    }

    if (formType === 'register') {
      return 'Cadastre-se'
    }

    return 'Recuperar Senha?'
  }

  return (
    <Stack spacing="md" p="md">
      <SidebarHeader
        title={setHeaderTitle()}
        closeSidebar={() => setAuthSidebarOpened(false)}
      />

      {formType === 'login' && (
        <>
          <Text color={dark ? theme.white : theme.colors.brand[7]}>
            Ainda não possui conta?{' '}
            <ActionText
              text="Cadastre-se!"
              onClick={() => setFormType('register')}
            />
          </Text>
          <LoginForm setFormType={setFormType} />
        </>
      )}

      {formType === 'register' && (
        <>
          <Text color={dark ? theme.white : theme.colors.brand[7]}>
            Já possui uma conta?{' '}
            <ActionText
              text="Fazer Login!"
              onClick={() => setFormType('login')}
            />
          </Text>
          <RegisterForm />
        </>
      )}

      {formType === 'forgotPassword' && (
        <>
          <Text color={dark ? theme.white : theme.colors.brand[7]}>
            Informe seu email para receber um link de recuperação.
          </Text>
          <ForgotForm setFormType={setFormType} />
        </>
      )}
    </Stack>
  )
}
