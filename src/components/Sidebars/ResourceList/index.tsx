import {
  Box,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { DefaultLoadMoreButton } from 'components/Shared/Default/DefaultLoadMoreButton'
import { SearchResources } from 'components/Shared/Search/SearchResources'
import { SidebarHeader } from 'components/Shared/SidebarHeader'
import { useResource } from 'contexts/resourceContext'
import { useSidebar } from 'contexts/sidebarContext'
import { useState } from 'react'
import { ResourceItem } from './ResourceItem'

interface ResourceListProps {
  isVotingPainel?: boolean
}

export function ResourceList({ isVotingPainel }: ResourceListProps) {
  const [end, setEnd] = useState(30)

  const { setSavedResourcesOpened, setVotingPanelOpened } = useSidebar()
  const { filterResources } = useResource()

  const userResources = filterResources()

  const notApprovedResources = filterResources().sort((a, b) => {
    const newA = a.createdAt.split('/').reverse().join('-')
    const newB = b.createdAt.split('/').reverse().join('-')
    return +new Date(newB) - +new Date(newA)
  })

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  function renderResourceItems() {
    if (isVotingPainel) {
      return notApprovedResources
        .slice(0, end)
        .map((resource) => (
          <ResourceItem key={`resource-${resource.id}`} resource={resource} />
        ))
    }

    return userResources
      .slice(0, end)
      .map((resource) => (
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
        {(!isVotingPainel && userResources.length <= 0) ||
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

      {notApprovedResources.length - end > 0 && (
        <DefaultLoadMoreButton
          end={end}
          step={30}
          setEnd={setEnd}
          data={notApprovedResources}
        />
      )}
    </Stack>
  )
}
