import {
  Avatar,
  Stack,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { useState } from 'react'
import { afterElementStyles, afterStyles } from 'styles/dropzoneStyles'

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
        onReject={(files) => console.log('rejected files', files)}
        sx={afterStyles(theme, dark)}
      >
        {(status) => (
          <Avatar
            src={avatarSrc ?? 'avatar.svg'}
            size={180}
            radius={999}
            sx={afterElementStyles(theme, status)}
          />
        )}
      </Dropzone>
    </Stack>
  )
}
