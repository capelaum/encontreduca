import { ActionIcon, useMantineColorScheme } from '@mantine/core'
import { FaMoon, FaSun } from 'react-icons/fa'
import { theme } from 'styles/theme'

export function ToggleTheme() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <ActionIcon
      sx={{
        position: 'absolute',
        bottom: '1rem',
        right: '1rem',
        color: theme.colors!.cyan![4]
      }}
      variant="filled"
      size="xl"
      color="brand"
      onClick={() => toggleColorScheme()}
      title="Alternar tema light/dark"
    >
      {dark ? <FaSun size={20} /> : <FaMoon size={18} />}
    </ActionIcon>
  )
}
