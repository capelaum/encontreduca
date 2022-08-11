import {
  Button,
  Stack,
  TextInput,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { buttonStyles, inputStyles } from 'components/Shared/styles/inputStyles'
import { handleRegisterFormErrors } from 'helpers/formErrorsHandlers'
import { validateEmail } from 'helpers/validate'
import { RegisterFormValues } from 'types/forms'

export function RegisterForm() {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const form = useForm<RegisterFormValues>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },

    validateInputOnChange: ['name', 'email', 'password', 'confirmPassword'],

    validate: {
      name: (value) => (value.trim().length < 3 ? 'Nome muito curto' : null),
      email: (value) => validateEmail(value),
      password: (value) =>
        value.trim().length > 0 && value.trim().length < 6
          ? 'Senha deve ter mais de 6 caracteres'
          : null,
      confirmPassword: (value) => {
        if (value.trim().length > 0 && value.trim().length < 6) {
          return 'Senha deve ter mais de 6 caracteres'
        }

        if (value !== form.values.password) {
          return 'Senhas não conferem'
        }

        return null
      }
    }
  })

  const handleSubmit = async (values: typeof form.values) => {
    console.log(values)
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit, handleRegisterFormErrors)}>
      <Stack spacing="md">
        <TextInput
          required
          radius="md"
          placeholder="Nome completo"
          label="Nome completo"
          {...form.getInputProps('name')}
          sx={inputStyles(theme, dark)}
        />

        <TextInput
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
          Cadastrar
        </Button>
      </Stack>
    </form>
  )
}
