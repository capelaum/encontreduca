import {
  Box,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { SearchResources } from 'components/Shared/SearchResources'
import { SidebarHeader } from 'components/Shared/SidebarHeader'
import { useResource } from 'contexts/resourceContext'
import { useSidebar } from 'contexts/sidebarContext'
import { ResourceItem } from './ResourceItem'

interface ResourceListProps {
  isVotingPainel?: boolean
}

export function ResourceList({ isVotingPainel }: ResourceListProps) {
  const { setSavedResourcesOpened, setVotingPanelOpened } = useSidebar()
  const { user, resources } = useResource()

  const userApprovedResources = resources!.filter(
    ({ id, approved }) => approved && user && user.resourcesIds.includes(+id)
  )
  const notApprovedResources = resources!.filter(({ approved }) => !approved)

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  function renderResourceItems() {
    if (isVotingPainel) {
      return notApprovedResources.map((resource) => (
        <ResourceItem key={`resource-${resource.id}`} resource={resource} />
      ))
    }

    return userApprovedResources.map((resource) => (
      <ResourceItem key={`resource-${resource.id}`} resource={resource} />
    ))
  }

  return (
    <Stack my="md" spacing="md">
      <Box px="md">
        <SidebarHeader
          title={isVotingPainel ? 'Painel de votação' : 'Recursos salvos'}
          closeSidebar={
            isVotingPainel
              ? () => setVotingPanelOpened(false)
              : () => setSavedResourcesOpened(false)
          }
        />
      </Box>

      {isVotingPainel && (
        <Text px="md">
          <Text
            component="strong"
            sx={{
              color: dark ? theme.white : theme.colors.cyan[5],
              fontWeight: 500
            }}
          >
            Vote contra ou a favor{' '}
          </Text>
          da inserção dos recursos recém cadastrados.
        </Text>
      )}

      <Stack spacing={0} pt={8}>
        {(!isVotingPainel && userApprovedResources.length <= 0) ||
        (isVotingPainel && notApprovedResources.length <= 0) ? (
          <Text
            px="md"
            size="md"
            weight={500}
            color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}
          >
            Hey, não tem nenhum recursso por aqui 😕.
          </Text>
        ) : (
          <Box px="md">
            <SearchResources />
          </Box>
        )}

        <Stack spacing={0} pt={32}>
          {renderResourceItems()}
        </Stack>
      </Stack>
    </Stack>
  )
}
