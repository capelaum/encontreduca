import { Image, Stack } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useResource } from 'contexts/resourceContext'
import { Author } from './Author'
import { ReviewStats } from './ReviewStats'

export function Cover() {
  const largeScreen = useMediaQuery('(min-width: 768px)', false)

  const { resource } = useResource()

  return (
    <Stack spacing="sm">
      <Image
        fit="cover"
        sx={{
          borderRadius: '7px',
          overflow: 'hidden',
          maxWidth: largeScreen ? '380px' : '100%',
          maxHeight: largeScreen ? '200px' : '300px'
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
