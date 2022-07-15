import { Button, Group } from '@mantine/core'

interface ButtonsProps {
  onCancel: () => void
  onConfirm: () => void
}

export function Buttons({ onCancel, onConfirm }: ButtonsProps) {
  return (
    <Group spacing="md" align="center" position="right">
      <Button
        mt="md"
        size="sm"
        radius="md"
        variant="outline"
        onClick={onCancel}
      >
        Cancelar
      </Button>

      <Button
        mt="md"
        size="sm"
        radius="md"
        variant="default"
        onClick={onConfirm}
        sx={(theme) => ({
          backgroundColor: theme.colors.cyan[3],
          color: theme.colors.brand[7],
          '&:hover': {
            backgroundColor: theme.colors.cyan[4],
            color: theme.colors.brand[8]
          }
        })}
      >
        Enviar
      </Button>
    </Group>
  )
}
