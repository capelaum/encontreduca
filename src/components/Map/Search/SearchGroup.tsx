import {
  Burger,
  CSSObject,
  Group,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { SearchResources } from 'components/Shared/SearchResources'
import { useSidebar } from 'contexts/sidebarContext'

export function SearchGroup() {
  const {
    menuOpened,
    setMenuOpened,
    resourceOpened,
    setSavedResourcesOpened,
    changeResourceOpened,
    setVotingPanelOpened
  } = useSidebar()

  const largeScreen = useMediaQuery('(min-width: 768px)', false)
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const searchGroupStyles = (): CSSObject => ({
    width: largeScreen ? '380px' : 'calc(100vw - 40px)',
    zIndex: resourceOpened && !menuOpened && !changeResourceOpened ? 100 : 2,
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
        color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}
        sx={{
          backgroundColor: dark ? theme.colors.brand[7] : theme.colors.gray[0]
        }}
        onClick={() => {
          setMenuOpened(true)
          setSavedResourcesOpened(false)
          setVotingPanelOpened(false)
        }}
      />

      <SearchResources isMap />
    </Group>
  )
}
