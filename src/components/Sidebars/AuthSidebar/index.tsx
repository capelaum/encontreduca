import {
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useModals } from '@mantine/modals'
import { ModalEmail } from 'components/Modals/ModalEmail'
import { SidebarHeader } from 'components/Shared/SidebarHeader'
import {
  modalStyles,
  useModalStyles
} from 'components/Shared/styles/modalStyles'
import { Title } from 'components/Shared/Title'
import { useSidebar } from 'contexts/sidebarContext'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FormType } from 'types/forms'
import { ActionText } from './ActionText'
import { ForgotForm } from './ForgotForm'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'

export function AuthSidebar() {
  const [formType, setFormType] = useState<FormType>('login')

  const router = useRouter()
  const { emailVerified } = router.query

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
              ? 'Email confirmado'
              : 'Email já confirmado'
          }
        />
      ),
      children: (
        <ModalEmail
          onClose={() => closeModal(id)}
          title={
            emailVerified === 'true'
              ? 'Tudo pronto! Seu email foi confirmado.'
              : 'Seu email já foi confirmado.'
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
    if (
      router.query.emailVerified === 'true' ||
      router.query.emailVerified === 'already'
    ) {
      router.query.emailVerified = undefined
      openModalVerified()
    }
  }, [])

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
