import { Box, Stack, Text } from '@mantine/core'
import { useResource } from 'contexts/resourceContext'
import { ActionButtons } from './ActionButtons'
import { Cover } from './Cover'
import { Header } from './Header'
import { Info } from './Info'
import { ResourceSkeleton } from './ResourceSkeleton'
import { Reviews } from './Reviews'

export function Resource() {
  const { resource, resourceReviews, isFetchingResourceData } = useResource()

  if (!resource) {
    return <Text px="md">Ooops, por favor selecione um recurso...</Text>
  }

  if (isFetchingResourceData) {
    return <ResourceSkeleton />
  }

  return (
    <Box>
      <Stack mt={88} px="md" spacing="md">
        <Header />

        <Cover />

        <ActionButtons />
      </Stack>

      <Info />

      {resourceReviews?.length > 0 && <Reviews />}
    </Box>
  )
}
