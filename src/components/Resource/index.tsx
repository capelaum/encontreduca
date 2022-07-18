import { Box, Stack } from '@mantine/core'
import { useSidebar } from 'contexts/sidebarContext'
import { ActionButtons } from './ActionButtons'
import { Cover } from './Cover'
import { Header } from './Header'
import { Info } from './Info'
import { Reviews } from './Reviews'

export function Resource() {
  const { resource, setResourceOpened } = useSidebar()

  if (!resource) {
    setResourceOpened(false)
    return null
  }

  return (
    <Box>
      <Stack mt={resource.approved ? 88 : 'md'} px="md" spacing="md">
        <Header />

        <Cover />

        <ActionButtons />
      </Stack>

      <Info />

      <Reviews />
    </Box>
  )
}
