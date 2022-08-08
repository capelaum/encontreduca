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
import { useEffect, useState } from 'react'
import { TbPhoto } from 'react-icons/tb'
import { ResourceFormValues } from 'types/resources'
import { ProfileFormValues } from 'types/users'

interface CoverDropzoneProps {
  form: UseFormReturnType<ResourceFormValues>
  resourceCover: string | null
  setHasPreview: (hasPreview: boolean) => void
  setImageBase64: (image: string | ArrayBuffer | null) => void
}

export function CoverDropzone({
  form,
  resourceCover,
  setImageBase64,
  setHasPreview
}: CoverDropzoneProps) {
  const [preview, setPreview] = useState<string | null>(null)

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  useEffect(() => {
    if (preview) {
      setHasPreview(true)
    }
  }, [preview])

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
      setImageBase64={setImageBase64}
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
