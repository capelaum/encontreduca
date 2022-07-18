import { Group, Stack, Textarea } from '@mantine/core'
import { ContextModalProps } from '@mantine/modals'
import { ActionButton } from 'components/Resource/ActionButtons/ActionButton'
import { Buttons } from 'components/Shared/Buttons'
import { textareaStyles } from 'components/Shared/styles/inputStyles'
import { useState } from 'react'
import { FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa'
import { CloseButton } from '../Shared/CloseButton'

export function ModalVote({
  context,
  id,
  innerProps
}: ContextModalProps<{ onConfirmText: string }>) {
  const { onConfirmText } = innerProps

  const [justification, setJustification] = useState('')

  return (
    <Stack spacing="md">
      <CloseButton onClick={() => context.closeModal(id)} />

      <Group spacing={32} align="start" position="center" py="md">
        <ActionButton
          text="Aprovar"
          icon={<FaRegThumbsUp size={28} />}
          onClick={() => console.log('Aprovar')}
        />

        <ActionButton
          text="Desaprovar"
          icon={<FaRegThumbsDown size={28} />}
          onClick={() => console.log('Desaprovar')}
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
        sx={textareaStyles}
        placeholder="Por favor forneça uma justificativa"
      />

      <Buttons
        onCancel={() => context.closeModal(id)}
        onConfirm={() => context.closeModal(id)}
        onConfirmText={onConfirmText}
      />
    </Stack>
  )
}
