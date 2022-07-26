import {
  Group,
  Stack,
  Textarea,
  UnstyledButton,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { ContextModalProps } from '@mantine/modals'
import { ConfirmButtons } from 'components/Shared/ConfirmButtons'
import { Profile } from 'components/Shared/Profile'
import { showToast } from 'components/ToastMessage'
import { useState } from 'react'
import { MdStar, MdStarBorder } from 'react-icons/md'
import { textareaStyles } from 'styles/inputStyles'
import { CloseButton } from '../Shared/CloseButton'

export function ModalReview({
  context,
  id,
  innerProps
}: ContextModalProps<{
  text?: string
  onConfirmText: string
  isEdit?: boolean
}>) {
  const { text, onConfirmText, isEdit } = innerProps
  const { closeModal } = context

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const [comment, setComment] = useState(text)
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  return (
    <Stack spacing="md">
      <CloseButton onClick={() => closeModal(id)} />

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
                <MdStar size={24} color={theme.colors.yellow[6]} />
              ) : (
                <MdStarBorder
                  size={24}
                  color={dark ? theme.colors.gray[0] : theme.colors.gray[7]}
                />
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
        sx={textareaStyles(theme, dark)}
        placeholder="Descreva sua experiência neste local"
      />

      <ConfirmButtons
        onCancel={() => closeModal(id)}
        onConfirm={() => {
          closeModal(id)
          showToast({
            title: isEdit ? 'Avaliação atualizada!' : 'Avaliação enviada!',
            description: isEdit
              ? 'Mudar de ideia faz parte 😉'
              : 'Agradecemos sua avaliação ✌️',
            icon: <MdStar size={24} color={theme.colors.brand[7]} />,
            dark
          })
        }}
        onConfirmText={onConfirmText}
      />
    </Stack>
  )
}
