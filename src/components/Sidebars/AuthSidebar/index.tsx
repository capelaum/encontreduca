import {
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useModals } from '@mantine/modals'
import { ModalEmail } from 'components/Modals'
import { SidebarHeader } from 'components/Shared/SidebarHeader'
import {
  modalStyles,
  useModalStyles
} from 'components/Shared/styles/modalStyles'
import { Title } from 'components/Shared/Title'
import { useAuth } from 'contexts/authContext'
import { useSidebar } from 'contexts/sidebarContext'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FormType } from 'types/forms'
import { ActionText } from './ActionText'
import { ForgotForm } from './ForgotForm'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'
import ResetPasswordForm from './ResetPasswordForm'

export function AuthSidebar() {
  const [formType, setFormType] = useState<FormType>('login')

  const router = useRouter()
  const { emailVerified, token, email, register } = router.query

  const { user } = useAuth()

  const { setAuthSidebarOpened } = useSidebar()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  useEffect(() => {
    if (user) {
      setAuthSidebarOpened(false)
      setFormType('login')
    }
  }, [user])

  const setHeaderTitle = () => {
    if (formType === 'resetPassword') {
      return 'Redefinição de senha'
    }

    if (formType === 'register') {
      return 'Cadastre-se'
    }

    if (formType === 'forgotPassword') {
      return 'Recuperar Senha'
    }

    return 'Fazer Login'
  }

  const { classes } = useModalStyles(dark)

  const { openModal, closeModal } = useModals()

  const openModalVerified = () => {
    const id = openModal({
      classNames: classes,
      ...modalStyles,
      overflow: 'outside',
      title: (
        <Title
          name={
            emailVerified === 'true'
              ? 'Email verificado'
              : 'Email já verificado'
          }
        />
      ),
      children: (
        <ModalEmail
          onClose={() => closeModal(id)}
          title={
            emailVerified === 'true'
              ? 'Tudo pronto! Seu email foi verificado.'
              : 'Seu email já foi verificado.'
          }
          text="Faça login e comece a usufruir de todas funcionalidades do Encontreduca."
          image={{
            src: '/images/icons/done.svg',
            alt: 'Ícone de check de feito'
          }}
        />
      )
    })
  }

  useEffect(() => {
    if (emailVerified === 'true' || emailVerified === 'already') {
      router.query.emailVerified = undefined
      openModalVerified()
    }

    if (register === 'true') {
      setFormType('register')
    }

    if (token && email) {
      setFormType('resetPassword')
    }
  }, [
    router.query.emailVerified,
    router.query.token,
    router.query.email,
    router.query.register
  ])

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
          <RegisterForm setFormType={setFormType} />
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

      {formType === 'resetPassword' && (
        <>
          <Text color={dark ? theme.white : theme.colors.brand[7]}>
            Use uma senha forte e você não será hackeado por ninguém.
          </Text>
          <ResetPasswordForm setFormType={setFormType} />
        </>
      )}
    </Stack>
  )
}
