import {
  Stack,
  Textarea,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { ConfirmButtons } from 'components/Shared/ConfirmButtons'
import { DefaultOverlay } from 'components/Shared/DefaultOverlay'
import { textareaStyles } from 'components/Shared/styles/inputStyles'
import { showToast, showToastError } from 'components/Shared/ToastMessage'
import { useResource } from 'contexts/resourceContext'
import { createSupportRequest } from 'lib/supportRequestsLib'
import { useState } from 'react'
import { MdOutlineHelp } from 'react-icons/md'
import { DefaultCloseButton } from '../../Shared/DefaultCloseButton'

interface ModalSupportProps {
  onClose: () => void
}

export function ModalSupport({ onClose }: ModalSupportProps) {
  const { user } = useResource()
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleOnConfirm = async () => {
    if (!user) {
      setIsLoading(false)

      showToastError({
        title: 'É necessário estar logado para realizar esta ação',
        description: 'Por favor, faça login para continuar'
      })

      return
    }

    if (!message || message.trim().length < 3) {
      showToastError({
        title: 'Mensagem é obrigatória',
        description: 'Por favor, digite uma mensagem para o suporte.'
      })

      return
    }

    setIsLoading(true)

    await createSupportRequest({
      user_id: user!.id,
      message
    })

    setIsLoading(false)

    onClose()
    showToast({
      title: 'Seu pedido foi enviado!',
      description: 'Em breve, nossa equipe te responderá por email.',
      icon: <MdOutlineHelp size={24} color={theme.colors.brand[7]} />,
      dark
    })
  }

  return (
    <Stack spacing="md">
      <DefaultCloseButton onClick={onClose} title="Fechar Modal" />

      <DefaultOverlay visible={isLoading} />

      <Textarea
        mt={20}
        required
        radius="md"
        size="md"
        autosize
        minRows={5}
        maxRows={5}
        variant="filled"
        onChange={(e) => setMessage(e.target.value)}
        value={message ?? ''}
        sx={textareaStyles(theme, dark)}
        placeholder="Descreva sua dúvida, problema, sugestão, etc."
      />

      <ConfirmButtons
        onCancel={onClose}
        onConfirm={() => handleOnConfirm()}
        onConfirmText="Enviar"
      />
    </Stack>
  )
}
