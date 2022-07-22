import { AspectRatio, Image, Stack } from '@mantine/core'
import { useSidebar } from 'contexts/sidebarContext'
import { Author } from './Author'
import { ReviewStats } from './ReviewStats'

export function Cover() {
  const { resource } = useSidebar()

  return (
    <Stack spacing="sm">
      <AspectRatio
        ratio={16 / 9}
        sx={{ maxWidth: '380px', maxHeight: '200px' }}
      >
        <Image
          radius="md"
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
