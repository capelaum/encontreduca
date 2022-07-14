import { ActionIcon, Group, TextInput, Tooltip } from '@mantine/core'
import { MdMenu, MdSearch } from 'react-icons/md'
import { myTheme } from 'styles/theme'

interface SearchProps {
  setMenuOpened: (value: boolean) => void
  isResourceOpened?: boolean
}

export function Search({ setMenuOpened, isResourceOpened }: SearchProps) {
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
    <Group
      spacing={0}
      align="center"
      position="left"
      sx={(theme) => ({
        position: 'absolute',
        top: theme.spacing.md,
        left: theme.spacing.md,
        width: '380px',
        zIndex: 100,
        borderRadius: theme.radius.md,
        backgroundColor: theme.colors.brand[7],
        border: isResourceOpened ? '1px solid #66d9e8' : 'none'
      })}
    >
      <ActionIcon
        radius="md"
        variant="hover"
        size="xl"
        onClick={() => setMenuOpened(true)}
      >
        <MdMenu
          title="Abrir Menu Principal"
          size={32}
          color={myTheme.colors!.brand![0]}
        />
      </ActionIcon>

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
          flex: 1
        }}
      />
    </Group>
  )
}
