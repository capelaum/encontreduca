import {
  CSSObject,
  Image,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { DefaultDropzone } from 'components/Shared/DefaultDropzone'
import { useEffect, useState } from 'react'
import { TbPhoto } from 'react-icons/tb'
import { ResourceFormValues } from 'types/resources'

interface CoverDropzoneProps {
  form: UseFormReturnType<ResourceFormValues>
  setImageBase64: (image: string | ArrayBuffer | null) => void
}

export function CoverDropzone({ form, setImageBase64 }: CoverDropzoneProps) {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    if (preview) {
      form.setFieldValue('resourceCover', preview)
    }
  }, [preview])

  const containerStyles = (): CSSObject => ({
    height: 200
  })

  return (
    <DefaultDropzone
      name="cover"
      radius="md"
      containerStyles={containerStyles}
      setPreview={setPreview}
      setImageBase64={setImageBase64}
    >
      {preview ? (
        <Image
          height={200}
          radius="md"
          src={preview}
          alt="Imagem de capa do recurso"
          title="Imagem de capa do recurso"
          sx={{
            borderRadius: 'md',
            objectFit: 'cover',
            objectPosition: 'center'
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
