import { Box, Stack, Text } from '@mantine/core'
import { useResource } from 'contexts/resourceContext'
import { ActionButtons } from './ActionButtons'
import { Cover } from './Cover'
import { Info } from './Info'
import { Reviews } from './Reviews'
import { SidebarResourceHeader } from './SidebarResourceHeader'
import { SidebarResourceSkeleton } from './SidebarResourceSkeleton'

export function SidebarResource() {
  const { resource, resourceReviewsQuantity, isFetchingResourceData } =
    useResource()

  if (!resource) {
    return <Text px="md">Ooops, por favor selecione um recurso...</Text>
  }

  if (isFetchingResourceData) {
    return <SidebarResourceSkeleton />
  }

  return (
    <Box>
      <Stack mt={88} px="md" pb={48} spacing="md">
        <SidebarResourceHeader />

        <Cover />

        <ActionButtons />
      </Stack>

      <Info />

      {resourceReviewsQuantity > 0 && <Reviews />}
    </Box>
  )
}
