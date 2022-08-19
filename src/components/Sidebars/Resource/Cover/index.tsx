import { Image, Stack } from '@mantine/core'
import { useResource } from 'contexts/resourceContext'
import { Author } from './Author'
import { ReviewStats } from './ReviewStats'

export function Cover() {
  const { resource } = useResource()

  return (
    <Stack spacing="sm">
      <Image
        fit="cover"
        sx={{
          borderRadius: '7px',
          maxWidth: '380px',
          maxHeight: '200px',
          overflow: 'hidden'
        }}
        withPlaceholder
        src={resource!.cover}
        alt={`Imagem de capa do recurso ${resource!.name}`}
        title={`Imagem de capa do recurso ${resource!.name}`}
      />

      <ReviewStats />
      <Author />
    </Stack>
  )
}
