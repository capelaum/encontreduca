import { AspectRatio, Image, Stack } from '@mantine/core'
import { useResource } from 'contexts/resourceContext'
import { Review } from 'types/reviews'
import { Author } from './Author'
import { ReviewStats } from './ReviewStats'

interface CoverProps {
  reviews: Review[]
}

export function Cover({ reviews }: CoverProps) {
  const { resource } = useResource()

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

      <ReviewStats reviews={reviews} />
      <Author />
    </Stack>
  )
}
