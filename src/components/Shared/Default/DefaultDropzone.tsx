import {
  Center,
  MantineNumberSize,
  Sx,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { UseFormReturnType } from '@mantine/form'
import { showToastError } from 'components/Shared/ToastMessage'
import { ReactNode, useState } from 'react'
import { MdClose, MdOutlineFileUpload } from 'react-icons/md'
import { ProfileFormValues, ResourceFormValues } from 'types/forms'

import { dropzoneStyles } from 'styles/dropzoneStyles'

interface DefaultDropzoneProps {
  name: string
  radius: MantineNumberSize
  children: ReactNode
  containerStyles: Sx | (Sx | undefined)[] | undefined
  form: UseFormReturnType<ResourceFormValues | ProfileFormValues>
  setPreview: (image: string | null) => void
  setImageBase64: (image: string | ArrayBuffer | null) => void
}

export function DefaultDropzone({
  name,
  radius,
  children,
  form,
  containerStyles,
  setPreview,
  setImageBase64
}: DefaultDropzoneProps) {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const [isLoading, setIsLoading] = useState(false)

  const handleOnDrop = async (files: File[]) => {
    setIsLoading(true)

    const file = files[0]

    const previewImage = URL.createObjectURL(file)
    setPreview(previewImage)

    const reader = new FileReader()

    reader.onload = (event) => {
      setImageBase64(event.target!.result)
    }

    reader.readAsDataURL(file)

    setIsLoading(false)
  }

  const handleOnReject = () => {
    showToastError({
      title: 'Oops! Formato não suportado.',
      description: 'Por favor, tente novamente com uma imagem válida.'
    })
  }

  return (
    <Dropzone
      name={name}
      radius={radius}
      padding={0}
      multiple={false}
      loading={isLoading}
      accept={IMAGE_MIME_TYPE}
      maxSize={5000000}
      onDrop={(files) => handleOnDrop(files)}
      onReject={() => handleOnReject()}
      {...form.getInputProps('cover')}
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
  )
}
