import { AspectRatio, Image, Stack } from '@mantine/core'
import { useResource } from 'contexts/resourceContext'
import { Author } from './Author'
import { ReviewStats } from './ReviewStats'

export function Cover() {
  const { resource } = useResource()

  return (
    <Stack spacing="sm">
      <AspectRatio
        ratio={16 / 9}
        sx={{ maxWidth: '380px', maxHeight: '200px' }}
      >
        <Image
          fit="cover"
          sx={{ borderRadius: '7px' }}
          withPlaceholder
          src={resource!.cover}
          alt={`Imagem de capa do recurso ${resource!.name}`}
          title={`Imagem de capa do recurso ${resource!.name}`}
        />
      </AspectRatio>

      <ReviewStats />
      <Author />
    </Stack>
  )
}
