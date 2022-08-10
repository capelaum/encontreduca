import { Box, Stack, Text } from '@mantine/core'
import { useResource } from 'contexts/resourceContext'
import { useSidebar } from 'contexts/sidebarContext'
import { ActionButtons } from './ActionButtons'
import { Cover } from './Cover'
import { Header } from './Header'
import { Info } from './Info'
import { Reviews } from './Reviews'

export function Resource() {
  const { setResourceOpened } = useSidebar()
  const { resource, resourceReviews } = useResource()

  if (!resource) {
    setResourceOpened(false)
    return <Text>Ooops, selecione um recurso!</Text>
  }

  return (
    <Box>
      <Stack mt={resource.approved ? 88 : 'md'} px="md" spacing="md">
        <Header />

        <Cover />

        <ActionButtons />
      </Stack>

      <Info />

      {resourceReviews.length > 0 && <Reviews />}
    </Box>
  )
}
