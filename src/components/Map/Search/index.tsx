import {
  Burger,
  CSSObject,
  Group,
  MantineTheme,
  TextInput,
  Tooltip
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useSidebar } from 'contexts/sidebarContext'
import { MdSearch } from 'react-icons/md'
import { myTheme } from 'styles/theme'

export function Search() {
  const largeScreen = useMediaQuery('(min-width: 768px)', false)

  const {
    menuOpened,
    setMenuOpened,
    resourceOpened,
    setSavedResourcesOpened,
    setVotingPanelOpened,
    resource
  } = useSidebar()

  const searchStyles = (theme: MantineTheme): CSSObject => ({
    width: largeScreen ? '380px' : '100%',
    zIndex:
      resourceOpened && resource?.approved && !menuOpened && largeScreen
        ? 100
        : 1,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.brand[7],
    border: resourceOpened ? `1px solid ${theme.colors.cyan[4]}` : 'none'
  })

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
    <Group spacing={0} align="center" position="left" sx={searchStyles}>
      <Burger
        color={myTheme.colors!.brand![0]}
        ml={12}
        opened={menuOpened}
        onClick={() => {
          setMenuOpened(true)
          setSavedResourcesOpened(false)
          setVotingPanelOpened(false)
        }}
        title="Abrir Menu Principal"
      />

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
        sx={(theme) => ({
          flex: 1,
          input: {
            backgroundColor: theme.colors.brand[7]
          },
          'input:focus': {
            outline: 'none',
            border: 'none'
          }
        })}
      />
    </Group>
  )
}
