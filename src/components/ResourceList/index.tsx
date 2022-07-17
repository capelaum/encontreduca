import { Box, Group, Stack, TextInput, Tooltip } from '@mantine/core'
import { Back } from 'components/Shared/Back'
import { searchInputStyles } from 'components/Shared/styles/inputStyles'
import { Title } from 'components/Shared/Title'
import { useSidebar } from 'contexts/sidebarContext'
import data from 'data/resources.json'
import { MdSearch } from 'react-icons/md'
import { myTheme } from 'styles/theme'
import { ResourceItem } from './ResourceItem'

export function ResourceList() {
  const { setSavedResourcesOpened } = useSidebar()
  const { resources } = data

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
    <Stack my="md" spacing="md" role="form">
      <Group px="md" align="start" position="apart" spacing={0}>
        <Title name="Recursos salvos" />
        <Back setSidebarOpened={setSavedResourcesOpened} />
      </Group>

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
        {resources.map((resource) => (
          <ResourceItem key={resource.id} resource={resource} />
        ))}
      </Stack>
    </Stack>
  )
}
