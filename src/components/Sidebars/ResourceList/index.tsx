import {
  Box,
  Stack,
  Text,
  TextInput,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { SidebarHeader } from 'components/Shared/SidebarHeader'
import { useResource } from 'contexts/resourceContext'
import { useSidebar } from 'contexts/sidebarContext'
import { MdSearch } from 'react-icons/md'
import { ResourceType } from 'types/resources'
import { ResourceItem } from './ResourceItem'
import { searchInputStyles } from './searchInputStyles'

interface ResourceListProps {
  isVotingPainel?: boolean
  resources: ResourceType[]
}

export function ResourceList({ isVotingPainel, resources }: ResourceListProps) {
  const { setSavedResourcesOpened, setVotingPanelOpened } = useSidebar()
  const { user } = useResource()

  const userApprovedResources = resources.filter(
    ({ id, approved }) => approved && user && user.resourcesIds.includes(+id)
  )
  const notApprovedResources = resources.filter(({ approved }) => !approved)

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  function renderResourceItems() {
    if (isVotingPainel) {
      return notApprovedResources.map((resource) => (
        <ResourceItem key={`resource-${resource.id}`} resource={resource} />
      ))
    }

    if (userApprovedResources.length <= 0) {
      return (
        <Text
          px="md"
          size="md"
          weight={500}
          color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}
        >
          Hey, você não tem nenhum recursso salvo 😕.
        </Text>
      )
    }

    return userApprovedResources.map((resource) => (
      <ResourceItem key={`resource-${resource.id}`} resource={resource} />
    ))
  }

  const rightSection = () => (
    <Tooltip
      multiline
      label="Busque os recursos educacionais por nome"
      position="bottom-end"
      transition="pop-bottom-right"
      radius={theme.radius.md}
      width={170}
      withArrow
      arrowSize={6}
      px={8}
      offset={-2}
      sx={{
        color: theme.colors.brand[7],
        backgroundColor: theme.colors.cyan[3],
        borderRadius: theme.radius.md
      }}
    >
      <Box>
        <MdSearch
          size={28}
          color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}
          style={{
            display: 'block',
            position: 'relative'
          }}
        />
      </Box>
    </Tooltip>
  )

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
              color: dark ? theme.colors.cyan[3] : theme.colors.cyan[8],
              fontWeight: 500
            }}
          >
            Vote contra ou a favor{' '}
          </Text>
          da inserção dos recursos recém cadastrados.
        </Text>
      )}

      <Stack spacing={0} pt={8}>
        {isVotingPainel ||
          (userApprovedResources.length > 0 && (
            <Box px="md">
              <TextInput
                size="md"
                radius="md"
                type="search"
                variant="filled"
                id="search-resource"
                rightSection={rightSection()}
                rightSectionWidth={40}
                placeholder="Busque um recurso"
                aria-label="Buscar recursos educacionais"
                sx={searchInputStyles(theme, dark)}
              />
            </Box>
          ))}

        {renderResourceItems()}
      </Stack>
    </Stack>
  )
}
