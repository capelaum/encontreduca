import {
  Button,
  Stack,
  TextInput,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { DefaultOverlay } from 'components/Shared/Default/DefaultOverlay'
import { buttonStyles, inputStyles } from 'components/Shared/styles/inputStyles'
import { useAuth } from 'contexts/authContext'
import { handleResetPasswordFormErrors } from 'helpers/formErrorsHandlers'
import { validateEmail } from 'helpers/validate'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FormType, ResetPasswordFormValues } from 'types/forms'

interface ResetPasswordFormProps {
  setFormType: (type: FormType) => void
}

export default function ResetPasswordForm({
  setFormType
}: ResetPasswordFormProps) {
  const { isAuthLoading, resetPassword } = useAuth()

  const router = useRouter()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const form = useForm<ResetPasswordFormValues>({
    initialValues: {
      token: (router.query.token as string) || '',
      email: (router.query.email as string) || '',
      password: '',
      confirmPassword: ''
    },

    validateInputOnChange: ['name', 'email', 'password', 'confirmPassword'],

    validate: {
      email: (value) => validateEmail(value),
      password: (value) =>
        value.trim().length > 0 && value.trim().length < 8
          ? 'Senha deve ter mais de 8 caracteres'
          : null,
      confirmPassword: (value) => {
        if (value.trim().length > 0 && value.trim().length < 8) {
          return 'Senha deve ter mais de 8 caracteres'
        }

        if (form.values.confirmPassword !== form.values.password) {
          return 'Senhas não conferem'
        }

        return null
      }
    }
  })

  useEffect(() => {
    form.values.email = (router.query.email as string) || ''
    form.values.token = (router.query.token as string) || ''
  }, [router.query.email, router.query.token])

  const handleSubmit = async (values: typeof form.values) => {
    await resetPassword(values)

    form.reset()

    setFormType('login')

    router.push('/')
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit, handleResetPasswordFormErrors)}>
      <DefaultOverlay visible={isAuthLoading} />

      <Stack spacing="md">
        <TextInput
          disabled
          required
          type="email"
          label="Email"
          placeholder="Email"
          {...form.getInputProps('email')}
          sx={inputStyles(theme, dark)}
        />

        <TextInput
          required
          type="password"
          placeholder="Senha"
          label="Senha"
          {...form.getInputProps('password')}
          sx={inputStyles(theme, dark)}
        />

        <TextInput
          type="password"
          placeholder="Repetir senha"
          label="Repetir senha"
          {...form.getInputProps('confirmPassword')}
          sx={inputStyles(theme, dark)}
        />

        <Button
          size="sm"
          radius="md"
          type="submit"
          sx={buttonStyles(theme, dark)}
        >
          Resetar
        </Button>
      </Stack>
    </form>
  )
}
