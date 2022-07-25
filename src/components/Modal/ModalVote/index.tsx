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
import { useState } from 'react'
import { FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa'
import { textareaStyles } from 'styles/inputStyles'
import { CloseButton } from '../Shared/CloseButton'

export function ModalVote({
  context,
  id,
  innerProps
}: ContextModalProps<{ onConfirmText: string }>) {
  const { onConfirmText } = innerProps

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

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
        sx={textareaStyles(theme, dark)}
        placeholder="Por favor forneça uma justificativa"
      />

      <ConfirmButtons
        onCancel={() => context.closeModal(id)}
        onConfirm={() => context.closeModal(id)}
        onConfirmText={onConfirmText}
      />
    </Stack>
  )
}
