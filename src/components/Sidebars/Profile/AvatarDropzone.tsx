import {
  Avatar,
  Center,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { afterStyles } from 'components/Shared/styles/dropzoneStyles'
import { showToast } from 'components/Shared/ToastMessage'
import { useState } from 'react'
import { MdCancel, MdClose, MdOutlineFileUpload } from 'react-icons/md'

export function AvatarDropzone() {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const [isLoading, setIsLoading] = useState(false)
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null)

  const uploadAvatarImage = async (files: File[]) => {
    setIsLoading(true)

    const preview = URL.createObjectURL(files[0])

    setAvatarSrc(preview)
    setIsLoading(false)
  }

  return (
    <Stack my="md" spacing="md" align="center">
      <Dropzone
        name="userAvatar"
        radius={999}
        padding={0}
        multiple={false}
        loading={isLoading}
        accept={IMAGE_MIME_TYPE}
        onDrop={(file) => uploadAvatarImage(file)}
        color="cyan"
        onReject={() =>
          showToast({
            title: 'Oops! Formato não suportado.',
            description: 'Por favor, tente novamente com uma imagem válida.',
            icon: <MdCancel size={24} color={theme.colors.brand[7]} />,
            dark
          })
        }
        sx={afterStyles(theme, dark)}
      >
        <Center
          sx={{
            borderRadius: 999,
            minWidth: 180,
            minHeight: 180
          }}
        >
          <Dropzone.Accept>
            <Stack align="center" spacing="sm">
              <MdOutlineFileUpload
                size={50}
                color={dark ? theme.colors.cyan[3] : theme.colors.gray[7]}
              />
              <Text color={dark ? theme.colors.cyan[3] : theme.colors.gray[7]}>
                Solte sua imagem aqui
              </Text>
            </Stack>
          </Dropzone.Accept>

          <Dropzone.Reject>
            <Stack align="center" spacing="sm">
              <MdClose size={50} color={theme.colors.red[6]} />
              <Text color={theme.colors.red[6]}>Tipo não suportado</Text>
            </Stack>
          </Dropzone.Reject>

          <Dropzone.Idle>
            <Avatar src={avatarSrc ?? 'avatar.svg'} size={180} radius={999} />
          </Dropzone.Idle>
        </Center>
      </Dropzone>
    </Stack>
  )
}
