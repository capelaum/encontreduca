import {
  Box,
  Group,
  Image,
  MantineTheme,
  Stack,
  Text,
  useMantineTheme
} from '@mantine/core'
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { useSidebar } from 'contexts/sidebarContext'
import { useState } from 'react'
import { TbPhoto, TbUpload, TbX } from 'react-icons/tb'
import { ResourceType } from 'types/resources'
import styles from './styles.module.scss'

function getIconColor(status: DropzoneStatus, theme: MantineTheme): string {
  if (status.accepted) {
    return theme.colors.brand[0]
  }

  if (status.rejected) {
    return theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
  }

  if (theme.colorScheme === 'dark') {
    return theme.colors.dark[0]
  }

  return theme.colors.gray[7]
}

function renderImageUploadIcon(status: DropzoneStatus, theme: MantineTheme) {
  if (status.accepted) {
    return <TbUpload size={80} style={{ color: getIconColor(status, theme) }} />
  }

  if (status.rejected) {
    return <TbX size={80} style={{ color: getIconColor(status, theme) }} />
  }

  return <TbPhoto size={80} style={{ color: getIconColor(status, theme) }} />
}

export const dropzoneChildren = ({
  status,
  theme,
  isCoverUploaded,
  resource
}: {
  status: DropzoneStatus
  theme: MantineTheme
  isCoverUploaded: boolean
  resource: ResourceType | null
}) => {
  if (isCoverUploaded || resource) {
    return (
      <Box className={styles.cover_container}>
        <Image
          width="100%"
          height={200}
          radius="md"
          src={
            resource ? resource.cover : 'https://dummyimage.com/380x200/333/fff'
          }
          alt="Imagem de capa do recurso"
          title="Imagem de capa do recurso"
          className={styles.cover_image}
        />
        <Box className={styles.middle}>
          <Box className={styles.text}>
            <Text>Trocar imagem </Text>
          </Box>
        </Box>
      </Box>
    )
  }

  return (
    <Group
      position="center"
      spacing="xl"
      style={{ minHeight: 200, pointerEvents: 'none' }}
    >
      <Stack align="center" spacing="sm">
        {renderImageUploadIcon(status, theme)}

        <Text size="md">Formatos: png, jpg ou jpeg</Text>

        <Text size="sm" color="dimmed">
          Tamanho máximo de 5MB
        </Text>
      </Stack>
    </Group>
  )
}

export function CoverDropzone() {
  const { resource } = useSidebar()
  const theme = useMantineTheme()
  const [isCoverUploaded, setIsCoverUploaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const uploadCoverImage = async (files: File[]) => {
    console.log('🚀 ~ files', files)
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      setIsCoverUploaded(true)
    }, 3000)
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
      sx={{
        'input:hover': {
          backgroundColor: theme.colors.brand[0]
        }
      }}
    >
      {(status) =>
        dropzoneChildren({ status, theme, isCoverUploaded, resource })
      }
    </Dropzone>
  )
}
