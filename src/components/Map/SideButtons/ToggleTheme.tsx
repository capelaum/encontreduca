import { useMantineColorScheme } from '@mantine/core'
import { FaMoon, FaSun } from 'react-icons/fa'
import { SideButton } from './SideButton'

export function ToggleTheme() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <SideButton
      onClick={() => toggleColorScheme()}
      text="Alternar tema light/dark"
    >
      {dark ? <FaSun size={20} /> : <FaMoon size={18} />}
    </SideButton>
  )
}
