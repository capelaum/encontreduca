import {
  Button,
  CSSObject,
  Stack,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { DefaultAvatar } from 'components/Shared/Default/DefaultAvatar'
import { DefaultDropzone } from 'components/Shared/Default/DefaultDropzone'
import { DefaultOverlay } from 'components/Shared/Default/DefaultOverlay'
import { showToast, showToastError } from 'components/Shared/ToastMessage'
import { useResource } from 'contexts/resourceContext'
import { destroyImage } from 'helpers/imageHelpers'
import { deleteUserAvatar, getUser } from 'lib/usersLib'
import { useEffect, useState } from 'react'
import { FaUserEdit } from 'react-icons/fa'
import { MdOutlineNoPhotography } from 'react-icons/md'
import { ResourceFormValues } from 'types/resources'
import { ProfileFormValues } from 'types/users'

interface AvatarDropzoneProps {
  form: UseFormReturnType<ProfileFormValues>
  setHasPreview: (hasPreview: boolean) => void
  setImageBase64: (image: string | ArrayBuffer | null) => void
}

export function AvatarDropzone({
  form,
  setHasPreview,
  setImageBase64
}: AvatarDropzoneProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const { user, setUser } = useResource()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  useEffect(() => {
    if (preview) {
      setHasPreview(true)
    }
  }, [preview])

  const handleDeleteUserAvatar = async () => {
    setIsLoading(true)

    if (user!.avatarUrl) {
      try {
        await destroyImage({ imageUrl: user!.avatarUrl })
        await deleteUserAvatar({ userId: +user!.id })
      } catch (error) {
        setIsLoading(false)

        showToastError({
          title: 'Erro ao deletar avatar',
          description: (error as Error).message
        })

        return
      }
    }

    const updatedUser = await getUser(+user!.id)
    setUser(updatedUser)

    setIsLoading(false)
    setPreview(null)

    showToast({
      title: 'Sua foto de perfil foi excluída',
      description:
        'Você pode adicionar uma nova foto de perfil a qualquer momento',
      icon: <FaUserEdit size={24} color={theme.colors.brand[7]} />,
      dark
    })
  }

  const containerStyles = (): CSSObject => ({
    borderRadius: 999,
    width: 180,
    height: 180
  })

  return (
    <Stack align="center">
      <DefaultDropzone
        name="avatar"
        radius={999}
        form={form as UseFormReturnType<ResourceFormValues | ProfileFormValues>}
        setPreview={setPreview}
        setImageBase64={setImageBase64}
        containerStyles={containerStyles}
      >
        <DefaultOverlay visible={isLoading} />
        <DefaultAvatar avatarSrc={preview ?? user?.avatarUrl} size={180} />
      </DefaultDropzone>

      {user!.avatarUrl && (
        <Button
          size="xs"
          radius="md"
          variant="default"
          leftIcon={<MdOutlineNoPhotography size={16} />}
          onClick={() => handleDeleteUserAvatar()}
          sx={{
            fontWeight: 400,
            backgroundColor: theme.colors.red[7],
            color: 'white',
            border: 'none',
            '&:hover': {
              backgroundColor: theme.colors.red[8]
            }
          }}
        >
          Excluir foto de perfil
        </Button>
      )}
    </Stack>
  )
}
