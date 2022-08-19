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
import { SidebarHeader } from 'components/Shared/SidebarHeader'
import { buttonStyles, inputStyles } from 'components/Shared/styles/inputStyles'
import { showToast, showToastError } from 'components/Shared/ToastMessage'
import { useAuth } from 'contexts/authContext'
import { useSidebar } from 'contexts/sidebarContext'
import { handleProfileFormErrors } from 'helpers/formErrorsHandlers'
import { updateImage, uploadImage } from 'helpers/imageHelpers'
import {
  validateConfirmPassword,
  validateEmail,
  validateImageBase64,
  validatePassword
} from 'helpers/validate'
import { getUser, updateUser } from 'lib/usersLib'
import { useState } from 'react'
import { FaUserEdit } from 'react-icons/fa'
import { MdOutlineMarkEmailUnread } from 'react-icons/md'
import { PasswordFormTypes, ProfileFormValues } from 'types/forms'
import { AvatarDropzone } from './AvatarDropzone'
import { DeleteUserButton } from './DeleteUserButton'

export function UpdateProfile() {
  const [isLoading, setIsLoading] = useState(false)
  const [hasPreview, setHasPreview] = useState(false)
  const [imageBase64, setImageBase64] = useState<string | ArrayBuffer | null>(
    null
  )

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
      avatarUrl: user?.avatarUrl ?? null,
      password: '',
      confirmPassword: ''
    },

    validateInputOnChange: ['name', 'email', 'password', 'confirmPassword'],

    validate: {
      name: (value) => (value.trim().length < 3 ? 'Nome muito curto' : null),
      email: (value) => validateEmail(value),
      avatarUrl: () =>
        !hasPreview ? null : validateImageBase64(imageBase64, hasPreview),
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

  const createdOrUpdateUserAvatar = async (imgBase64: string | ArrayBuffer) => {
    let secure_url = null
    const folder = 'encontreduca/avatars'

    if (!user!.avatarUrl) {
      secure_url = await uploadImage({
        imageBase64: imgBase64,
        folder
      })
    }

    if (user!.avatarUrl) {
      secure_url = await updateImage({
        imageUrl: user!.avatarUrl,
        imageBase64: imgBase64,
        folder
      })
    }

    form.values.avatarUrl = secure_url
  }

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

    if (hasPreview && imageBase64) {
      try {
        await createdOrUpdateUserAvatar(imageBase64)
      } catch (error) {
        setIsLoading(false)

        showToastError({
          title: 'Erro ao atualizar foto de perfil',
          description: 'Não foi possível fazer upload desta imagem 😕'
        })

        return
      }
    }

    if (user && !sameUserData(values)) {
      await updateMutation.mutateAsync({
        userId: +user.id,
        updatedUser: {
          name: values.name,
          email: values.email,
          avatarUrl: values.avatarUrl,
          password: values.password === '' ? null : values.password,
          confirmPassword:
            values.confirmPassword === '' ? null : values.confirmPassword
        }
      })
    }

    const updatedUser = await getUser(+user!.id)
    setUser(updatedUser)

    form.values.name = updatedUser!.name
    form.values.email = updatedUser!.email
    form.values.avatarUrl = updatedUser!.avatarUrl

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
    >
      <DefaultOverlay visible={isLoading} />

      <Stack spacing="md" p="md">
        <SidebarHeader
          title="Perfil"
          closeSidebar={() => setProfileOpened(false)}
        />

        <AvatarDropzone
          form={form}
          setHasPreview={setHasPreview}
          setImageBase64={setImageBase64}
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
