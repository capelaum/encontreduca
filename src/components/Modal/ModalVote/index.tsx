import {
  Group,
  Stack,
  Textarea,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { ContextModalProps } from '@mantine/modals'
import { ActionButton } from 'components/Resource/ActionButtons/ActionButton'
import { ConfirmButtons } from 'components/Shared/ConfirmButtons'
import { showToast } from 'components/ToastMessage'
import { useState } from 'react'
import {
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp
} from 'react-icons/fa'
import { textareaStyles } from 'styles/inputStyles'
import { CloseButton } from '../Shared/CloseButton'

type Vote = 'Aprovado' | 'Reprovado' | null

export function ModalVote({
  context,
  id,
  innerProps
}: ContextModalProps<{ onConfirmText: string }>) {
  const { onConfirmText } = innerProps
  const { closeModal } = context

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const [justification, setJustification] = useState('')
  const [vote, setVote] = useState<Vote>(null)

  const setVoteIcon = (isThumbsUp: boolean) => {
    switch (vote) {
      case 'Aprovado':
        return isThumbsUp ? (
          <FaThumbsUp size={28} />
        ) : (
          <FaRegThumbsDown size={28} />
        )
      case 'Reprovado':
        return isThumbsUp ? (
          <FaRegThumbsUp size={28} />
        ) : (
          <FaThumbsDown size={28} />
        )
      default:
        return isThumbsUp ? (
          <FaRegThumbsUp size={28} />
        ) : (
          <FaRegThumbsDown size={28} />
        )
    }
  }

  return (
    <Stack spacing="sm">
      <CloseButton onClick={() => closeModal(id)} />

      <Group spacing={32} align="start" position="center" py="md">
        <ActionButton
          text="Aprovar"
          icon={setVoteIcon(true)}
          onClick={() => {
            setVote('Aprovado')
          }}
        />

        <ActionButton
          text="Desaprovar"
          icon={setVoteIcon(false)}
          onClick={() => {
            setVote('Reprovado')
          }}
        />
      </Group>

      <Textarea
        required
        radius="md"
        size="md"
        autosize
        minRows={4}
        maxRows={5}
        variant="filled"
        onChange={(e) => setJustification(e.target.value)}
        value={justification}
        sx={textareaStyles(theme, dark)}
        placeholder="Por favor forneça uma justificativa"
      />

      <ConfirmButtons
        onCancel={() => closeModal(id)}
        onConfirm={() => {
          closeModal(id)
          showToast({
            title: 'Seu voto foi enviado!',
            description: 'Agradecemos sua participação!',
            icon: <FaThumbsUp size={24} color={theme.colors.brand[7]} />,
            dark
          })
        }}
        onConfirmText={onConfirmText}
      />
    </Stack>
  )
}
