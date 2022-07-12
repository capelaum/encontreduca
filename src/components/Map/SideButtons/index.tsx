import { Stack } from '@mantine/core'
import { CurrentLocation } from './CurrentLocation'
import { ToggleTheme } from './ToggleTheme'

export function SideButtons() {
  return (
    <Stack
      align="center"
      spacing={8}
      sx={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem' }}
    >
      <CurrentLocation />
      <ToggleTheme />
    </Stack>
  )
}
