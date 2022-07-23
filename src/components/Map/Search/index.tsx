import {
  Burger,
  CSSObject,
  Group,
  TextInput,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useSidebar } from 'contexts/sidebarContext'
import { MdSearch } from 'react-icons/md'

export function Search() {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const largeScreen = useMediaQuery('(min-width: 768px)', false)

  const {
    menuOpened,
    setMenuOpened,
    resourceOpened,
    setSavedResourcesOpened,
    setVotingPanelOpened,
    resource
  } = useSidebar()

  const searchStyles = (): CSSObject => ({
    width: largeScreen ? '380px' : '100%',
    zIndex:
      resourceOpened && resource?.approved && !menuOpened && largeScreen
        ? 100
        : 1,
    borderRadius: theme.radius.md,
    backgroundColor: dark ? theme.colors.brand[7] : theme.colors.brandLight[0],
    border: resourceOpened ? `1px solid ${theme.colors.cyan[4]}` : 'none',
    boxShadow: dark ? 'none' : '0 1px 4px rgba(0, 0, 0, 0.3)'
  })

  const rightSection = (
    <Tooltip
      label="Busque os recursos educacionais por nome"
      position="bottom"
      placement="center"
    >
      <MdSearch
        size={28}
        color={dark ? theme.colors.cyan[3] : theme.colors.brand[9]}
        style={{ display: 'block', position: 'relative' }}
      />
    </Tooltip>
  )

  return (
    <Group spacing={0} align="center" position="left" sx={searchStyles}>
      <Burger
        color={dark ? theme.colors.cyan[3] : theme.colors.brand[9]}
        ml={12}
        opened={menuOpened}
        onClick={() => {
          setMenuOpened(true)
          setSavedResourcesOpened(false)
          setVotingPanelOpened(false)
        }}
        title="Abrir Menu Principal"
        sx={{
          backgroundColor: dark
            ? theme.colors.brand[7]
            : theme.colors.brandLight[0]
        }}
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
        sx={{
          flex: 1,
          input: {
            color: dark ? theme.colors.dark[0] : theme.colors.brand[9],
            backgroundColor: dark
              ? theme.colors.brand[7]
              : theme.colors.brandLight[0]
          },
          'input:focus': {
            outline: 'none',
            border: 'none'
          }
        }}
      />
    </Group>
  )
}
