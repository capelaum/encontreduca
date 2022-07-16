import {
  Burger,
  CSSObject,
  Group,
  MantineTheme,
  TextInput,
  Tooltip
} from '@mantine/core'
import { useSidebar } from 'contexts/sidebarContext'
import { MdSearch } from 'react-icons/md'
import { myTheme } from 'styles/theme'

export function Search() {
  const { menuOpened, setMenuOpened, resourceOpened } = useSidebar()

  const searchStyles = (theme: MantineTheme): CSSObject => ({
    position: 'absolute',
    top: theme.spacing.md,
    left: theme.spacing.md,
    width: '380px',
    zIndex: 1,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.brand[7],
    border: resourceOpened ? '1px solid #66d9e8' : 'none'
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
        onClick={() => setMenuOpened(true)}
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
          }
        })}
      />
    </Group>
  )
}
