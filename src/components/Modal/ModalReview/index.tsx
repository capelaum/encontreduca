import { Group, Stack, Textarea, UnstyledButton } from '@mantine/core'
import { ContextModalProps } from '@mantine/modals'
import { Buttons } from 'components/Shared/Buttons'
import { Profile } from 'components/Shared/Profile'
import { useState } from 'react'
import { MdStar, MdStarBorder } from 'react-icons/md'
import { CloseButton } from '../Shared/CloseButton'
import styles from './styles.module.scss'

export function ModalReview({
  context,
  id,
  innerProps
}: ContextModalProps<{ text: string; onConfirmText: string }>) {
  const { text, onConfirmText } = innerProps
  const [comment, setComment] = useState(text)
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  return (
    <Stack spacing="md">
      <CloseButton onClick={() => context.closeModal(id)} />

      <Profile isModal />

      <Group spacing={2} align="center">
        {[...Array(5)].map((star, index) => {
          const starIndex = index + 1

          return (
            <UnstyledButton
              type="button"
              key={starIndex}
              onClick={() => setRating(starIndex)}
              onMouseEnter={() => setHover(starIndex)}
              onMouseLeave={() => setHover(rating)}
            >
              {starIndex <= (hover || rating) ? (
                <MdStar size={24} color="yellow" />
              ) : (
                <MdStarBorder size={24} />
              )}
            </UnstyledButton>
          )
        })}
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
        onConfirmText={onConfirmText}
      />
    </Stack>
  )
}
