import { Box, Stack } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useSidebar } from 'contexts/sidebarContext'
import { ActionButtons } from './ActionButtons'
import { Cover } from './Cover'
import { Header } from './Header'
import { Info } from './Info'
import { Reviews } from './Reviews'

export function Resource() {
  const largeScreen = useMediaQuery('(min-width: 768px)', false)

  const { resource, setResourceOpened } = useSidebar()

  if (!resource) {
    setResourceOpened(false)
    return null
  }

  return (
    <Box>
      <Stack
        mt={resource.approved && largeScreen ? 88 : 'md'}
        px="md"
        spacing="md"
      >
        <Header />

        <Cover />

        <ActionButtons />
      </Stack>

      <Info />

      <Reviews />
    </Box>
  )
}
