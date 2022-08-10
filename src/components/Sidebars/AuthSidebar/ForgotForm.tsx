import {
  Box,
  Button,
  Stack,
  TextInput,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { buttonStyles, inputStyles } from 'components/Shared/styles/inputStyles'
import { handleForgotFormErrors } from 'helpers/formErrorsHandlers'
import { validateEmail } from 'helpers/validate'
import { ForgotFormValues } from 'types/forms'
import { ActionText } from './ActionText'

interface ForgotFormProps {
  setFormType: (type: string) => void
}

export function ForgotForm({ setFormType }: ForgotFormProps) {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const form = useForm<ForgotFormValues>({
    initialValues: {
      email: ''
    },

    validateInputOnChange: ['email'],

    validate: {
      email: (value) => validateEmail(value)
    }
  })

  const handleSubmit = async (values: typeof form.values) => {
    console.log(values)
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit, handleForgotFormErrors)}>
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
