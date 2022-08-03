import {
  Button,
  Stack,
  TextInput,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { DefaultOverlay } from 'components/Shared/DefaultOverlay'
import { SidebarHeader } from 'components/Shared/SidebarHeader'
import { buttonStyles, inputStyles } from 'components/Shared/styles/inputStyles'
import { showToast, showToastError } from 'components/Shared/ToastMessage'
import { useResource } from 'contexts/resourceContext'
import { useSidebar } from 'contexts/sidebarContext'
import { handleProfileFormErrors } from 'helpers/resourceForm'
import { uploadImage } from 'helpers/uploadImage'
import { validateImageBase64 } from 'helpers/validate'
import { getUser, updateUser } from 'lib/usersLib'
import { useState } from 'react'
import { FaUserEdit } from 'react-icons/fa'
import { ProfileFormValues } from 'types/users'
import { AvatarDropzone } from './AvatarDropzone'
import { DeleteUserButton } from './DeleteUserButton'

export function UpdateProfile() {
  const [isLoading, setIsLoading] = useState(false)
  const [hasPreview, setHasPreview] = useState(false)
  const [imageBase64, setImageBase64] = useState<string | ArrayBuffer | null>(
    null
  )

  const { setProfileOpened } = useSidebar()
  const { user, setUser } = useResource()

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
        title: 'Erro ao criar recurso',
        description: (error as Error).message
      })

      setIsLoading(false)
    }
  })

  const form = useForm<ProfileFormValues>({
    initialValues: {
      name: user!.name,
      email: user!.email,
      avatarUrl: user!.avatar_url,
      password: '',
      confirmPassword: ''
    },

    validateInputOnChange: ['name', 'email', 'password', 'confirmPassword'],

    validate: {
      name: (value) => (value.trim().length < 3 ? 'Nome muito curto' : null),
      email: (value) => (value.trim().length < 3 ? 'Email muito curto' : null),
      avatarUrl: () =>
        !hasPreview ? null : validateImageBase64(imageBase64, hasPreview),
      password: (value) =>
        value.trim().length > 1 && value.trim().length < 6
          ? 'Senha deve ter o menos 6 caracteres'
          : null,
      confirmPassword: (value) => {
        if (value.trim().length > 1 && value.trim().length < 6) {
          return 'Senha deve ter o menos 6 caracteres'
        }

        if (value !== form.values.password) {
          return 'Senhas não conferem'
        }
        return null
      }
    }
  })

  const handleSubmit = async (values: typeof form.values) => {
    setIsLoading(true)

    if (hasPreview) {
      const secure_url = await uploadImage({
        imageBase64,
        folder: 'encontreduca/covers'
      })

      if (!secure_url) {
        showToastError({
          title: 'Erro ao criar recurso',
          description: 'Não foi possível fazer upload desta imagem 😕'
        })

        setIsLoading(false)
        return
      }

      form.values.avatarUrl = secure_url
    }

    const sameUserData = () =>
      user!.name === values.name &&
      user!.email === values.email &&
      user!.avatar_url === values.avatarUrl

    if (user && !sameUserData()) {
      await updateMutation.mutateAsync({
        userId: +user.id,
        updatedUser: {
          name: values.name,
          email: values.email,
          avatar_url: values.avatarUrl,
          password: values.password === '' ? null : values.password
        }
      })
    }

    const updatedUser = await getUser(+user!.id)
    setUser(updatedUser)
    console.log('🚀 ~ updatedUser', updatedUser)

    setIsLoading(false)

    showToast({
      title: 'Usuário atualizado com sucesso!',
      description: 'Mantenha sempre seu perfil atualizado!',
      icon: <FaUserEdit size={24} color={theme.colors.brand[7]} />,
      dark
    })
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit, handleProfileFormErrors)}>
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
          label="Email (necessário confirmar)"
          placeholder="Email"
          {...form.getInputProps('email')}
          sx={inputStyles(theme, dark)}
        />

        <TextInput
          type="password"
          label="Senha"
          placeholder="Senha"
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

        <Stack mt="sm" spacing="md">
          <Button
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
