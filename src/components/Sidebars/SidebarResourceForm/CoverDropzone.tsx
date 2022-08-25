import {
  CSSObject,
  Image,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { DefaultDropzone } from 'components/Shared/Default/DefaultDropzone'
import { useState } from 'react'
import { TbPhoto } from 'react-icons/tb'
import { ProfileFormValues, ResourceFormValues } from 'types/forms'

interface CoverDropzoneProps {
  form: UseFormReturnType<ResourceFormValues>
  resourceCover: string | null
  setCover: (avatar: File | null) => void
}

export function CoverDropzone({
  form,
  resourceCover,
  setCover
}: CoverDropzoneProps) {
  const [preview, setPreview] = useState<string | null>(null)

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const containerStyles = (): CSSObject => ({
    height: 200,
    width: '370px'
  })

  return (
    <DefaultDropzone
      name="cover"
      radius="md"
      form={form as UseFormReturnType<ResourceFormValues | ProfileFormValues>}
      setPreview={setPreview}
      setImageFile={setCover}
      containerStyles={containerStyles}
    >
      {preview || resourceCover ? (
        <Image
          height={200}
          radius="md"
          src={preview ?? resourceCover ?? ''}
          alt="Imagem de capa do recurso"
          title="Imagem de capa do recurso"
          sx={{
            borderRadius: 'md',
            objectFit: 'cover',
            objectPosition: 'center',
            width: '100%'
          }}
        />
      ) : (
        <Stack align="center" spacing="sm">
          <TbPhoto
            size={50}
            color={dark ? theme.colors.gray[4] : theme.colors.gray[6]}
          />
          <Text size="md">Formatos: png, jpg ou jpeg</Text>
          <Text size="sm">Tamanho máximo de 5MB</Text>
        </Stack>
      )}
    </DefaultDropzone>
  )
}
