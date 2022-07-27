import {
  Box,
  CSSObject,
  Stack,
  Text,
  TextInput,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { SidebarHeader } from 'components/Shared/SidebarHeader'
import { useSidebar } from 'contexts/sidebarContext'
import data from 'data/resources.json'
import { MdSearch } from 'react-icons/md'
import { ResourceItem } from './ResourceItem'

interface ResourceListProps {
  isVotingPainel?: boolean
}

export function ResourceList({ isVotingPainel }: ResourceListProps) {
  const { setSavedResourcesOpened, setVotingPanelOpened } = useSidebar()
  const { resources } = data

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

    return resources.map((resource) => (
      <ResourceItem key={`resource-${resource.id}`} resource={resource} />
    ))
  }

  const searchInputStyles = (): CSSObject => ({
    width: '100%',
    zIndex: 1,
    borderRadius: theme.radius.md,
    input: {
      color: dark ? theme.white : theme.colors.brand[7],
      backgroundColor: dark ? theme.colors.brand[8] : theme.colors.gray[2],
      border: 'none',
      '&:focus': {
        backgroundColor: dark ? theme.colors.brand[8] : theme.white,
        outline: `1px solid ${theme.colors.cyan[3]}`
      },
      '&::placeholder': {
        color: theme.colors.gray[6]
      }
    }
  })

  const rightSection = (
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
