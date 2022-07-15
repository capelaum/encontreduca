import { Group, Stack, Textarea } from '@mantine/core'
import { ContextModalProps } from '@mantine/modals'
import { Profile } from 'components/Shared/Profile'
import { useState } from 'react'
import { MdStar, MdStarBorder } from 'react-icons/md'
import { Buttons } from '../Shared/Buttons'
import styles from './styles.module.scss'

export function ModalReview({
  context,
  id,
  innerProps
}: ContextModalProps<{ text: string }>) {
  const { text } = innerProps
  const [comment, setComment] = useState(text)

  return (
    <Stack spacing="md">
      <Profile isModal />

      <Group spacing={2} align="center">
        <MdStar size={24} color="yellow" />
        <MdStar size={24} color="yellow" />
        <MdStar size={24} color="yellow" />
        <MdStar size={24} color="yellow" />
        <MdStarBorder size={24} />
      </Group>

      <Textarea
        required
        radius="md"
        size="md"
        autosize
        minRows={4}
        maxRows={5}
        variant="filled"
        onChange={(e) => setComment(e.target.value)}
        value={comment ?? ''}
        className={styles.textarea}
        placeholder="Descreva sua experiência neste local"
      />

      <Buttons
        onCancel={() => context.closeModal(id)}
        onConfirm={() => context.closeModal(id)}
      />
    </Stack>
  )
}
