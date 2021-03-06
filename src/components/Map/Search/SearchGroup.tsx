import {
  Box,
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

export function SearchGroup() {
  const {
    menuOpened,
    setMenuOpened,
    resourceOpened,
    setSavedResourcesOpened,
    changeResourceOpened,
    setVotingPanelOpened,
    resource
  } = useSidebar()

  const largeScreen = useMediaQuery('(min-width: 768px)', false)
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const searchGroupStyles = (): CSSObject => ({
    width: largeScreen ? '380px' : 'calc(100vw - 40px)',
    zIndex:
      resourceOpened &&
      resource?.approved &&
      !menuOpened &&
      largeScreen &&
      !changeResourceOpened
        ? 100
        : 1,
    borderRadius: theme.radius.md,
    backgroundColor: dark ? theme.colors.brand[7] : theme.colors.gray[0],
    border: resourceOpened
      ? `1px solid ${dark ? theme.colors.cyan[3] : theme.colors.brand[7]}`
      : 'none',
    boxShadow: dark || resourceOpened ? 'none' : '0 1px 4px rgba(0, 0, 0, 0.3)'
  })

  return (
    <Group spacing={0} align="center" position="left" sx={searchGroupStyles}>
      <Burger
        ml={12}
        opened={menuOpened}
        title="Abrir Menu Principal"
        onClick={() => {
          setMenuOpened(true)
          setSavedResourcesOpened(false)
          setVotingPanelOpened(false)
        }}
        sx={{
          backgroundColor: dark ? theme.colors.brand[7] : theme.colors.gray[0]
        }}
        color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}
      />

      <TextInput
        size="md"
        radius="md"
        type="search"
        variant="filled"
        id="search-resource"
        placeholder="Busque um recurso"
        aria-label="Buscar recursos educacionais"
        rightSectionWidth={40}
        rightSection={
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
        }
        sx={{
          width: '420px',
          flex: 1,
          input: {
            color: dark ? theme.colors.dark[0] : theme.colors.brand[7],
            backgroundColor: dark ? theme.colors.brand[7] : theme.colors.gray[0]
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
