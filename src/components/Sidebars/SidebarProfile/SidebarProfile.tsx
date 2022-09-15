import {
  Button,
  Stack,
  TextInput,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { DefaultOverlay } from 'components/Shared/Default/DefaultOverlay'
import { PasswordGroup } from 'components/Shared/PasswordGroup'
import { SidebarHeader } from 'components/Shared/Sidebar'
import { showToast, showToastError } from 'components/Shared/ToastMessage'
import { useAuth } from 'contexts/authContext'
import { useSidebar } from 'contexts/sidebarContext'
import { handleProfileFormErrors } from 'helpers/formErrorsHandlers'
import {
  validateConfirmPassword,
  validateEmail,
  validateImageFile,
  validatePassword
} from 'helpers/validate'
import { getUser, updateUser } from 'lib/usersLib'
import { useState } from 'react'
import { FaUserEdit } from 'react-icons/fa'
import { MdOutlineMarkEmailUnread } from 'react-icons/md'
import { buttonStyles, inputStyles } from 'styles/inputStyles'
import { PasswordFormTypes, ProfileFormValues } from 'types/forms'
import { AvatarDropzone } from './AvatarDropzone'
import { DeleteUserButton } from './DeleteUserButton'

export function SidebarProfile() {
  const [isLoading, setIsLoading] = useState(false)
  const [hasPreview, setHasPreview] = useState(false)
  const [avatar, setAvatar] = useState<File | null>(null)

  const { setProfileOpened } = useSidebar()
  const { user, setUser } = useAuth()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const queryClient = useQueryClient()

  const updateMutation = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['resources'])
    },
    onError: (error) => {
      showToastError({
        title: 'Erro ao atualizar perfil',
        description: (error as Error).message
      })

      setIsLoading(false)
    }
  })

  const form = useForm<ProfileFormValues>({
    initialValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      avatar: null,
      password: '',
      confirmPassword: ''
    },

    validateInputOnChange: ['name', 'email', 'password', 'confirmPassword'],

    validate: {
      name: (value) => (value.trim().length < 3 ? 'Nome muito curto' : null),
      email: (value) => validateEmail(value),
      avatar: () => (!avatar ? null : validateImageFile(avatar)),
      password: (value) => validatePassword(value),
      confirmPassword: (value, values) =>
        validateConfirmPassword(value, values.password)
    }
  })

  const isUpdatedEmail = (email: string) => user!.email !== email

  const sameUserData = (values: typeof form.values) =>
    user?.name === values.name &&
    user?.email === values.email &&
    !hasPreview &&
    values.password === '' &&
    values.confirmPassword === ''

  const handleSubmit = async (values: typeof form.values) => {
    setIsLoading(true)

    if (!user) {
      setIsLoading(false)

      showToastError({
        title: 'É necessário estar logado para criar/editar um recurso',
        description: 'Por favor, faça login para continuar'
      })

      return
    }

    if (!sameUserData(values)) {
      form.values.avatar = avatar

      const formData = new FormData()

      formData.append('name', values.name)
      formData.append('email', values.email)
      formData.append('password', values.password)
      formData.append('confirmPassword', values.confirmPassword)
      if (values.avatar) formData.append('avatar', values.avatar)

      await updateMutation.mutateAsync({
        userId: +user.id,
        updatedUser: formData
      })
    }

    const updatedUser = await getUser(+user!.id)
    setUser(updatedUser)

    form.values.name = updatedUser!.name
    form.values.email = updatedUser!.email

    setIsLoading(false)

    if (isUpdatedEmail(values.email)) {
      showToast({
        title: 'Verificar novo email',
        description: 'Um email de confirmação foi enviado para o novo email',
        icon: (
          <MdOutlineMarkEmailUnread size={24} color={theme.colors.brand[7]} />
        ),
        dark
      })
    }

    showToast({
      title: 'Usuário atualizado com sucesso!',
      description: 'Mantenha sempre seu perfil atualizado!',
      icon: <FaUserEdit size={24} color={theme.colors.brand[7]} />,
      dark
    })
  }

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit, handleProfileFormErrors)}
      autoComplete="off"
      encType="multipart/form-data"
    >
      <DefaultOverlay visible={isLoading} />

      <Stack spacing="md" p="md" pb={72}>
        <SidebarHeader
          title="Perfil"
          closeSidebar={() => setProfileOpened(false)}
        />

        <AvatarDropzone
          form={form}
          setHasPreview={setHasPreview}
          setAvatar={setAvatar}
        />

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
          label="Email (verificação necessária)"
          placeholder="Email"
          {...form.getInputProps('email')}
          sx={inputStyles(theme, dark)}
        />

        <PasswordGroup form={form as PasswordFormTypes} isRequired={false} />

        <Stack mt="sm" spacing="md">
          <Button
            disabled={sameUserData(form.values)}
            size="sm"
            radius="md"
            type="submit"
            sx={buttonStyles(theme, dark)}
          >
            Atualizar
          </Button>

          <DeleteUserButton />
        </Stack>
      </Stack>
    </form>
  )
}
