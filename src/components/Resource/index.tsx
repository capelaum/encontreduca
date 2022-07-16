import { Box, Stack } from '@mantine/core'
import { Search } from 'components/Map/Search'
import { useSidebar } from 'contexts/sidebarContext'
import { ActionButtons } from './ActionButtons'
import { Cover } from './Cover'
import { Header } from './Header'
import { Info } from './Info'
import { Reviews } from './Reviews'

export function Resource() {
  const { resource, setResourceOpened } = useSidebar()

  if (!resource) {
    return null
    setResourceOpened(false)
  }

  return (
    <Box>
      <Search />

      <Stack mt={88} px="md" spacing="md">
        <Header />

        <Cover />

        <ActionButtons />
      </Stack>

      <Info />

      <Reviews />
    </Box>
  )
}
