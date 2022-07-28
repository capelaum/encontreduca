import {
  Stack,
  Textarea,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { ConfirmButtons } from 'components/Shared/ConfirmButtons'
import { textareaStyles } from 'components/Shared/styles/inputStyles'
import { showToast } from 'components/Shared/ToastMessage'
import { useState } from 'react'
import { MdOutlineHelp } from 'react-icons/md'
import { DefaultCloseButton } from '../../Shared/DefaultCloseButton'

interface ModalSupportProps {
  onClose: () => void
}

export function ModalSupport({ onClose }: ModalSupportProps) {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const [comment, setComment] = useState<string | null>(null)

  return (
    <Stack spacing="md">
      <DefaultCloseButton onClick={onClose} title="Fechar Modal" />

      <Textarea
        required
        radius="md"
        size="md"
        autosize
        mt={24}
        minRows={5}
        maxRows={5}
        variant="filled"
        onChange={(e) => setComment(e.target.value)}
        value={comment ?? ''}
        sx={textareaStyles(theme, dark)}
        placeholder="Descreva sua dúvida, problema, sugestão, etc 😇"
      />

      <ConfirmButtons
        onCancel={onClose}
        onConfirm={() => {
          onClose()
          showToast({
            title: 'Seu pedido foi enviado!',
            description: 'Em breve, nossa equipe te responderá por email.',
            icon: <MdOutlineHelp size={24} color={theme.colors.brand[7]} />,
            dark
          })
        }}
        onConfirmText="Enviar"
      />
    </Stack>
  )
}
