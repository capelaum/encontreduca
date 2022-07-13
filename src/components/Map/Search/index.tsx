import { ActionIcon, Input, Tooltip } from '@mantine/core'
import { MdMenu, MdSearch } from 'react-icons/md'
import { theme as myTheme } from 'styles/theme'

interface SearchProps {
  setMenuOpened: (value: boolean) => void
}

export function Search({ setMenuOpened }: SearchProps) {
  const rightSection = (
    <Tooltip
      label="Busque os recursos educacionais por nome"
      position="bottom"
      placement="center"
    >
      <MdSearch
        size={28}
        color={myTheme.colors!.brand![5]}
        style={{ display: 'block' }}
      />
    </Tooltip>
  )

  return (
    <>
      <Input
        size="md"
        radius="md"
        type="search"
        variant="filled"
        id="search-resource"
        placeholder="Busque um recurso"
        rightSection={rightSection}
        sx={(theme) => ({
          position: 'absolute',
          top: theme.spacing.sm,
          left: theme.spacing.xl,
          width: '420px',
          zIndex: 1
        })}
      />

      <ActionIcon
        onClick={() => setMenuOpened(true)}
        variant="filled"
        size={42}
        color="brand"
        title="Abrir Menu Principal"
        sx={(theme) => ({
          position: 'absolute',
          top: theme.spacing.sm,
          left: theme.spacing.sm,
          color: theme.colors.cyan[3],
          zIndex: 1,
          '&:hover': {
            backgroundColor: theme.colors.brand[7]
          }
        })}
      >
        <MdMenu size={30} color={myTheme.colors!.brand![5]} />
      </ActionIcon>
    </>
  )
}
