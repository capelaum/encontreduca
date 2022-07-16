import { Button, Group } from '@mantine/core'

interface ButtonsProps {
  onCancel: () => void
  onConfirm: () => void
  onConfirmText: string
}

export function Buttons({ onCancel, onConfirm, onConfirmText }: ButtonsProps) {
  return (
    <Group mt="md" spacing="md" align="center" position="right">
      <Button size="sm" radius="md" variant="outline" onClick={onCancel}>
        Cancelar
      </Button>

      <Button
        size="sm"
        radius="md"
        variant="default"
        onClick={onConfirm}
        sx={(theme) => ({
          backgroundColor: theme.colors.cyan[3],
          color: theme.colors.brand[7],
          '&:hover': {
            backgroundColor: theme.colors.cyan[4]
          }
        })}
      >
        {onConfirmText}
      </Button>
    </Group>
  )
}
