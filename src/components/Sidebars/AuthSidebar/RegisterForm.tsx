import {
  Button,
  Stack,
  TextInput,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useModals } from '@mantine/modals'
import { ModalEmail } from 'components/Modals/ModalEmail'
import { DefaultOverlay } from 'components/Shared/Default/DefaultOverlay'
import { buttonStyles, inputStyles } from 'components/Shared/styles/inputStyles'
import {
  modalStyles,
  useModalStyles
} from 'components/Shared/styles/modalStyles'
import { Title } from 'components/Shared/Title'
import { useAuth } from 'contexts/authContext'
import { handleRegisterFormErrors } from 'helpers/formErrorsHandlers'
import { validateEmail } from 'helpers/validate'
import { FormType, RegisterFormValues } from 'types/forms'

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
      title: <Title name="Confirme seu email" />,
      children: (
        <ModalEmail
          onClose={() => closeModal(id)}
          title="Falta pouco! Confirme seu email."
          text="Enviamos um link de confirrmação para seu e-mail. Acesse e siga as instruções para concluir seu cadastro e usufruir de todas funcionalidades da platatorma Encontreduca."
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