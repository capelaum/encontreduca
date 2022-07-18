import { Box, Group, Stack, Text, TextInput, Tooltip } from '@mantine/core'
import { Back } from 'components/Shared/Back'
import { Title } from 'components/Shared/Title'
import { useSidebar } from 'contexts/sidebarContext'
import data from 'data/resources.json'
import { MdSearch } from 'react-icons/md'
import { searchInputStyles } from 'styles/inputStyles'
import { myTheme } from 'styles/theme'
import { ResourceItem } from './ResourceItem'

interface ResourceListProps {
  isVotingPainel?: boolean
}

export function ResourceList({ isVotingPainel }: ResourceListProps) {
  const { setSavedResourcesOpened, setVotingPanelOpened } = useSidebar()
  const { resources } = data

  const notApprovedResources = resources.filter(({ approved }) => !approved)

  function renderResourceItems() {
    if (isVotingPainel) {
      return notApprovedResources.map((resource) => (
        <ResourceItem key={resource.id} resource={resource} />
      ))
    }

    return resources.map((resource) => (
      <ResourceItem key={resource.id} resource={resource} />
    ))
  }

  const rightSection = (
    <Tooltip
      label="Busque os recursos educacionais por nome"
      position="bottom"
      placement="center"
    >
      <MdSearch
        size={28}
        color={myTheme.colors!.brand![0]}
        style={{ display: 'block', position: 'relative' }}
      />
    </Tooltip>
  )

  return (
    <Stack my="md" spacing="md">
      <Group px="md" align="start" position="apart" spacing={0}>
        <Title
          name={isVotingPainel ? 'Painel de votação' : 'Recursos salvos'}
        />
        <Back
          setSidebarOpened={
            isVotingPainel ? setVotingPanelOpened : setSavedResourcesOpened
          }
        />
      </Group>

      {isVotingPainel && (
        <Text px="md">
          <Text
            component="strong"
            sx={(theme) => ({
              color: theme.colors.cyan[3],
              fontWeight: 400
            })}
          >
            Vote contra ou a favor{' '}
          </Text>
          da inserção dos recursos recém cadastrados.
        </Text>
      )}

      <Box px="md">
        <TextInput
          size="md"
          radius="md"
          type="search"
          variant="filled"
          id="search-resource"
          rightSection={rightSection}
          rightSectionWidth={40}
          placeholder="Busque um recurso"
          aria-label="Buscar recursos educacionais"
          sx={searchInputStyles}
        />
      </Box>

      <Stack spacing={0} pt={8}>
        {renderResourceItems()}
      </Stack>
    </Stack>
  )
}
