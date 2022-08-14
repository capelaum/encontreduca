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
import { handleForgotFormErrors } from 'helpers/formErrorsHandlers'
import { validateEmail } from 'helpers/validate'
import { ForgotPasswordFormValues, FormType } from 'types/forms'
import { ActionText } from './ActionText'

interface ForgotFormProps {
  setFormType: (type: FormType) => void
}

export function ForgotForm({ setFormType }: ForgotFormProps) {
  const { sendResetPasswordLink, isAuthLoading } = useAuth()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const form = useForm<ForgotPasswordFormValues>({
    initialValues: {
      email: ''
    },

    validateInputOnChange: ['email'],

    validate: {
      email: (value) => validateEmail(value)
    }
  })

  const handleSubmit = async (values: typeof form.values) => {
    const response = await sendResetPasswordLink(values.email)

    if (!response) {
      return
    }

    form.reset()

    setFormType('login')
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit, handleForgotFormErrors)}>
      <DefaultOverlay visible={isAuthLoading} />

      <Stack spacing="md">
        <Box>
          <TextInput
            required
            type="email"
            label="Email"
            placeholder="Email"
            {...form.getInputProps('email')}
            sx={inputStyles(theme, dark)}
          />

          <ActionText
            size="sm"
            text="Voltar e entrar"
            onClick={() => setFormType('login')}
          />
        </Box>

        <Button
          size="sm"
          radius="md"
          type="submit"
          sx={buttonStyles(theme, dark)}
        >
          Recuperar
        </Button>
      </Stack>
    </form>
  )
}
