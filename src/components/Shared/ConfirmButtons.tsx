import {
  Button,
  Group,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { buttonStyles } from 'components/Shared/styles/inputStyles'

interface ButtonsProps {
  onCancel: () => void
  onConfirm: () => void
  onConfirmText: string
}

export function ConfirmButtons({
  onCancel,
  onConfirm,
  onConfirmText
}: ButtonsProps) {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <Group mt="md" spacing="md" align="center" position="right">
      <Button
        size="sm"
        radius="md"
        variant="outline"
        onClick={onCancel}
        sx={{
          color: dark ? theme.colors.cyan[3] : theme.colors.brand[7],
          border: `1px solid ${
            dark ? theme.colors.cyan[3] : theme.colors.brand[7]
          }`
        }}
      >
        Cancelar
      </Button>

      <Button
        size="sm"
        radius="md"
        variant="default"
        onClick={onConfirm}
        sx={buttonStyles(theme, dark)}
      >
        {onConfirmText}
      </Button>
    </Group>
  )
}
