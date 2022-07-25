import {
  Group,
  Image,
  MantineTheme,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { useSidebar } from 'contexts/sidebarContext'
import { useState } from 'react'
import { TbPhoto, TbUpload } from 'react-icons/tb'
import { afterElementStyles, afterStyles } from 'styles/dropzoneStyles'

// TODO set icon adn bg red on rejected status
function renderImageUploadIcon(
  { accepted, rejected }: DropzoneStatus,
  theme: MantineTheme
) {
  if (accepted || rejected) {
    return <TbUpload size={80} color={theme.colors.cyan[7]} />
  }

  return <TbPhoto size={80} color={theme.colors.gray[5]} />
}

export function CoverDropzone() {
  const { resource } = useSidebar()
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const [isLoading, setIsLoading] = useState(false)
  const [coverSrc, setCoverSrc] = useState<string | null>(null)

  const uploadCoverImage = async (files: File[]) => {
    setIsLoading(true)

    const preview = URL.createObjectURL(files[0])

    setTimeout(() => {
      setIsLoading(false)
      setCoverSrc(preview)
    }, 2000)
  }

  return (
    <Dropzone
      name="cover"
      loading={isLoading}
      radius="md"
      padding={0}
      multiple={false}
      onDrop={(files) => uploadCoverImage(files)}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      sx={afterStyles(theme, dark)}
    >
      {(status) => {
        if (coverSrc || resource) {
          return (
            <Image
              width="100%"
              radius="md"
              src={coverSrc ?? resource?.cover}
              alt="Imagem de capa do recurso"
              title="Imagem de capa do recurso"
              sx={{
                borderRadius: 'md',
                objectFit: 'cover',
                objectPosition: 'center',
                ...afterElementStyles(theme, status)
              }}
            />
          )
        }

        return (
          <Group
            position="center"
            spacing={0}
            sx={{
              minHeight: 200,
              ...afterElementStyles(theme, status)
            }}
          >
            <Stack align="center" spacing="sm">
              {renderImageUploadIcon(status, theme)}

              <Text size="md" color="dimmed">
                Formatos: png, jpg ou jpeg
              </Text>

              <Text size="sm" color="dimmed">
                Tamanho máximo de 5MB
              </Text>
            </Stack>
          </Group>
        )
      }}
    </Dropzone>
  )
}
