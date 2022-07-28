import {
  Center,
  MantineNumberSize,
  Stack,
  Sx,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { showToast } from 'components/Shared/ToastMessage'
import { ReactNode, useState } from 'react'
import { MdCancel, MdClose, MdOutlineFileUpload } from 'react-icons/md'
import { dropzoneStyles } from './styles/dropzoneStyles'

interface DefaultDropzoneProps {
  name: string
  radius: MantineNumberSize
  children: ReactNode
  containerStyles: Sx | (Sx | undefined)[] | undefined
  setImage: (image: string | null) => void
}

export function DefaultDropzone({
  name,
  radius,
  children,
  containerStyles,
  setImage
}: DefaultDropzoneProps) {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const [isLoading, setIsLoading] = useState(false)

  const uploadImage = async (files: File[]) => {
    setIsLoading(true)

    const preview = URL.createObjectURL(files[0])

    setImage(preview)
    setIsLoading(false)
  }

  return (
    <Stack my="md" spacing="md" align="center">
      <Dropzone
        name={name}
        radius={radius}
        padding={0}
        multiple={false}
        loading={isLoading}
        accept={IMAGE_MIME_TYPE}
        onDrop={(file) => uploadImage(file)}
        color="cyan"
        onReject={() =>
          showToast({
            title: 'Oops! Formato não suportado.',
            description: 'Por favor, tente novamente com uma imagem válida.',
            icon: <MdCancel size={24} color={theme.colors.brand[7]} />,
            dark
          })
        }
        sx={dropzoneStyles(theme, dark)}
      >
        <Center sx={containerStyles}>
          <Dropzone.Accept>
            <MdOutlineFileUpload size={50} color={theme.colors.cyan[5]} />
          </Dropzone.Accept>

          <Dropzone.Reject>
            <MdClose size={50} color={theme.colors.red[6]} />
          </Dropzone.Reject>

          <Dropzone.Idle>{children}</Dropzone.Idle>
        </Center>
      </Dropzone>
    </Stack>
  )
}
