import { createStyles } from '@mantine/core'
import { OpenContextModal } from '@mantine/modals/lib/context'

export const useModalStyles = createStyles((theme, dark: boolean) => ({
  modal: {
    backgroundColor: dark ? theme.colors.brand[7] : theme.colors.gray[0]
  }
}))

export const modalStyles = {
  radius: 'md',
  padding: 'md',
  centered: true,
  withCloseButton: false
} as OpenContextModal<{ text: string; onConfirmText: string }>
