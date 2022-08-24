import {
  Button,
  Stack,
  TextInput,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { DefaultOverlay } from 'components/Shared/Default/DefaultOverlay'
import { PasswordGroup } from 'components/Shared/PasswordGroup'
import { useAuth } from 'contexts/authContext'
import { handleResetPasswordFormErrors } from 'helpers/formErrorsHandlers'
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword
} from 'helpers/validate'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { buttonStyles, inputStyles } from 'styles/inputStyles'
import {
  FormType,
  PasswordFormTypes,
  ResetPasswordFormValues
} from 'types/forms'

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
      password: (value) => validatePassword(value),
      confirmPassword: (value, values) =>
        validateConfirmPassword(value, values.password)
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

        <PasswordGroup form={form as PasswordFormTypes} />

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
