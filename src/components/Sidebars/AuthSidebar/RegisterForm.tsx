import {
  Button,
  Stack,
  TextInput,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useModals } from '@mantine/modals'
import { ModalEmail } from 'components/Modals'
import { DefaultOverlay } from 'components/Shared/Default/DefaultOverlay'
import { PasswordGroup } from 'components/Shared/PasswordGroup'
import { buttonStyles, inputStyles } from 'components/Shared/styles/inputStyles'
import {
  modalStyles,
  useModalStyles
} from 'components/Shared/styles/modalStyles'
import { Title } from 'components/Shared/Title'
import { useAuth } from 'contexts/authContext'
import { handleRegisterFormErrors } from 'helpers/formErrorsHandlers'
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword
} from 'helpers/validate'
import { FormType, PasswordFormTypes, RegisterFormValues } from 'types/forms'

interface RegisterFormProps {
  setFormType: (type: FormType) => void
}

export function RegisterForm({ setFormType }: RegisterFormProps) {
  const { register, isAuthLoading } = useAuth()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { classes } = useModalStyles(dark)

  const { openModal, closeModal } = useModals()

  const openModalRegister = () => {
    const id = openModal({
      classNames: classes,
      ...modalStyles,
      overflow: 'outside',
      title: <Title name="Verifique seu email" />,
      children: (
        <ModalEmail
          onClose={() => closeModal(id)}
          title="Falta pouco! Verifique seu email."
          text="Enviamos um link de verificação para seu email. Acesse e siga as instruções para concluir seu cadastro e usufruir de todas funcionalidades da platatorma Encontreduca."
          image={{
            src: '/images/icons/plane.svg',
            alt: 'Ícone de email enviado'
          }}
        />
      )
    })
  }

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
      password: (value) => validatePassword(value),
      confirmPassword: (value, values) =>
        validateConfirmPassword(value, values.password)
    }
  })

  const handleSubmit = async (values: typeof form.values) => {
    const response = await register(values)

    if (!response) return

    form.reset()
    setFormType('login')

    openModalRegister()
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit, handleRegisterFormErrors)}>
      <DefaultOverlay visible={isAuthLoading} />

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

        <PasswordGroup form={form as PasswordFormTypes} />

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
