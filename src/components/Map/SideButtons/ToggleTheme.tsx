import { ActionIcon, useMantineColorScheme } from '@mantine/core'
import { FaMoon, FaSun } from 'react-icons/fa'

export function ToggleTheme() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <ActionIcon
      sx={(theme) => ({
        color: theme.colors.cyan[3],
        backgroundColor: theme.colors.brand[7]
      })}
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
