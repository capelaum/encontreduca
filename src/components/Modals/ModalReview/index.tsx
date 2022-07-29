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
import { textareaStyles } from 'components/Shared/styles/inputStyles'
import { showToast } from 'components/Shared/ToastMessage'
import { useState } from 'react'
import { MdStar, MdStarBorder } from 'react-icons/md'
import { DefaultCloseButton } from '../../Shared/DefaultCloseButton'

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
      <DefaultCloseButton onClick={() => closeModal(id)} title="Fechar Modal" />

      <Profile isModal />

      <Group spacing={2} align="center">
        {[...Array(5)].map((_, index) => {
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
                <MdStarBorder size={24} color={theme.colors.gray[6]} />
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
        minRows={5}
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
