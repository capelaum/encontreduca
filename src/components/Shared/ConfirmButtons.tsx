import {
  Button,
  Group,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { buttonStyles } from 'components/Shared/styles/inputStyles'

interface ButtonsProps {
  onConfirmType?: 'button' | 'submit' | 'reset' | undefined
  onCancelType?: 'button' | 'submit' | 'reset' | undefined
  onConfirmText: string
  onCancel: () => void
  onConfirm?: () => void
}

export function ConfirmButtons({
  onConfirmType,
  onCancelType,
  onConfirmText,
  onCancel,
  onConfirm
}: ButtonsProps) {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <Group mt="md" spacing="md" align="center" position="right">
      <Button
        type={onCancelType ?? 'button'}
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
        type={onConfirmType ?? 'button'}
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
