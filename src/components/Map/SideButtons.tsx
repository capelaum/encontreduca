import { ActionIcon, useMantineColorScheme } from '@mantine/core'
import { FaMoon, FaSun } from 'react-icons/fa'
import { MdMyLocation } from 'react-icons/md'

export function SideButtons() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <>
      <ActionIcon
        sx={{
          position: 'absolute',
          bottom: '4.25rem',
          right: '1rem',
          color: '#66d9e8'
        }}
        variant="filled"
        size="xl"
        color="brand"
        onClick={() => {}}
        title="Centralizar na  posição atual"
      >
        <MdMyLocation size={22} />
      </ActionIcon>

      <ActionIcon
        sx={{
          position: 'absolute',
          bottom: '1rem',
          right: '1rem',
          color: '#66d9e8'
        }}
        variant="filled"
        size="xl"
        color="brand"
        onClick={() => toggleColorScheme()}
        title="Alternar tema light/dark"
      >
        {dark ? <FaSun size={20} /> : <FaMoon size={18} />}
      </ActionIcon>
    </>
  )
}
