import { Image, Stack } from '@mantine/core'
import { useSidebar } from 'contexts/sidebarContext'
import { Author } from './Author'
import { ReviewStats } from './ReviewStats'

export function Cover() {
  const { resource } = useSidebar()

  return (
    <Stack spacing="sm">
      <Image
        width="100%"
        height={200}
        radius="md"
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
