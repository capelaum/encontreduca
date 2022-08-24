import {
  Stack,
  Textarea,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { ConfirmButtons } from 'components/Shared/ConfirmButtons'
import { DefaultCloseButton } from 'components/Shared/Default/DefaultCloseButton'
import { DefaultOverlay } from 'components/Shared/Default/DefaultOverlay'
import { showToast, showToastError } from 'components/Shared/ToastMessage'
import { useAuth } from 'contexts/authContext'
import { createSupportRequest } from 'lib/supportsLib'
import { useState } from 'react'
import { MdOutlineHelp } from 'react-icons/md'
import { textareaStyles } from 'styles/inputStyles'

interface ModalSupportProps {
  onClose: () => void
}

export function ModalSupport({ onClose }: ModalSupportProps) {
  const { user } = useAuth()
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

    try {
      await createSupportRequest({
        userId: user!.id,
        message
      })
    } catch (error) {
      setIsLoading(false)

      showToastError({
        title: 'Erro ao enviar pedido de suporte',
        description: (error as Error).message
      })

      return
    }

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
