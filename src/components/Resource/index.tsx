import { Box, Stack } from '@mantine/core'
import { Search } from 'components/Map/Search'
import { ActionButtons } from './ActionButtons'
import { Cover } from './Cover'
import { Header } from './Header'
import { Info } from './Info'
import { Reviews } from './Reviews'

export function Resource() {
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
