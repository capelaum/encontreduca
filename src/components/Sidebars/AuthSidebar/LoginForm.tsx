import {
  Box,
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
import { useSidebar } from 'contexts/sidebarContext'
import { handleLoginFormErrors } from 'helpers/formErrorsHandlers'
import { validateEmail } from 'helpers/validate'
import { FormType, LoginFormValues } from 'types/forms'
import { ActionText } from './ActionText'
import { SocialButtons } from './SocialButtons'

interface LoginFormProps {
  setFormType: (type: FormType) => void
}

export function LoginForm({ setFormType }: LoginFormProps) {
  const { login, isAuthLoading } = useAuth()

  const { setAuthSidebarOpened } = useSidebar()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const form = useForm<LoginFormValues>({
    initialValues: {
      email: '',
      password: ''
    },

    validateInputOnChange: ['email', 'password'],

    validate: {
      email: (value) => validateEmail(value),
      password: (value) =>
        value.trim().length > 0 && value.trim().length < 8
          ? 'Senha deve ter mais de 8 caracteres'
          : null
    }
  })

  const handleSubmit = async (values: typeof form.values) => {
    const response = await login(values)

    if (!response) return

    setAuthSidebarOpened(false)
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit, handleLoginFormErrors)}>
      <DefaultOverlay visible={isAuthLoading} />

      <Stack spacing="md">
        <TextInput
          required
          type="email"
          label="Email"
          placeholder="Email"
          {...form.getInputProps('email')}
          sx={inputStyles(theme, dark)}
        />

        <Box>
          <TextInput
            required
            type="password"
            placeholder="Senha"
            label="Senha"
            {...form.getInputProps('password')}
            sx={inputStyles(theme, dark)}
          />

          <ActionText
            size="sm"
            text="Esqueceu a senha?"
            onClick={() => setFormType('forgotPassword')}
          />
        </Box>

        <Button
          size="sm"
          radius="md"
          type="submit"
          sx={buttonStyles(theme, dark)}
        >
          Entrar
        </Button>

        <SocialButtons />
      </Stack>
    </form>
  )
}
