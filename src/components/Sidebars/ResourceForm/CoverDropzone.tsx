import {
  Center,
  Image,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { showToast } from 'components/Shared/ToastMessage'
import { useSidebar } from 'contexts/sidebarContext'
import { useState } from 'react'
import { MdCancel, MdClose, MdOutlineFileUpload } from 'react-icons/md'
import { TbPhoto } from 'react-icons/tb'
import { afterStyles } from 'styles/dropzoneStyles'

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
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      radius="md"
      padding={0}
      multiple={false}
      onDrop={(files) => uploadCoverImage(files)}
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
          height: 200,
          overflow: 'hidden'
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
          {coverSrc || resource?.cover ? (
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
                height: 200
              }}
            />
          ) : (
            <Stack align="center" spacing="sm">
              <TbPhoto size={50} color={theme.colors.gray[6]} />
              <Text size="md" color={theme.colors.gray[4]}>
                Formatos: png, jpg ou jpeg
              </Text>

              <Text size="sm" color="dimmed">
                Tamanho máximo de 5MB
              </Text>
            </Stack>
          )}
        </Dropzone.Idle>
      </Center>
    </Dropzone>
  )
}

/*
{coverSrc || resource ? (
        <Image
          width="100%"
          radius="md"
          src={coverSrc ?? resource?.cover}
          alt="Imagem de capa do recurso"
          title="Imagem de capa do recurso"
          sx={{
            borderRadius: 'md',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
      ) : (
        <Center
          sx={{
            minHeight: 200
          }}
        >
          <Stack align="center" spacing="sm">
            <Text size="md" color="dimmed">
              Formatos: png, jpg ou jpeg
            </Text>

            <Text size="sm" color="dimmed">
              Tamanho máximo de 5MB
            </Text>
          </Stack>
        </Center>
      )}


*/
