import {
  CSSObject,
  Image,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { DefaultDropzone } from 'components/Shared/DefaultDropzone'
import { useResource } from 'contexts/resourceContext'
import { useState } from 'react'
import { TbPhoto } from 'react-icons/tb'

export function CoverDropzone() {
  const { resource } = useResource()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const [coverSrc, setCoverSrc] = useState<string | null>(null)

  const containerStyles = (): CSSObject => ({
    height: 200
  })

  return (
    <DefaultDropzone
      name="cover"
      radius="md"
      containerStyles={containerStyles}
      setImage={setCoverSrc}
    >
      {coverSrc || resource?.cover ? (
        <Image
          height={200}
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
