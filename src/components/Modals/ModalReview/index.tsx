import {
  Group,
  Stack,
  Textarea,
  UnstyledButton,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { ContextModalProps } from '@mantine/modals'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ConfirmButtons } from 'components/Shared/ConfirmButtons'
import { DefaultCloseButton } from 'components/Shared/Default/DefaultCloseButton'
import { DefaultOverlay } from 'components/Shared/Default/DefaultOverlay'
import { Profile } from 'components/Shared/Profile'
import { textareaStyles } from 'components/Shared/styles/inputStyles'
import { showToast, showToastError } from 'components/Shared/ToastMessage'
import { useAuth } from 'contexts/authContext'
import { useResource } from 'contexts/resourceContext'
import { getResource } from 'lib/resourcesLib'
import { createReview, updateReview } from 'lib/reviewsLib'
import { useState } from 'react'
import { MdStar, MdStarBorder } from 'react-icons/md'
import { Review } from 'types/reviews'

export function ModalReview({
  context,
  id,
  innerProps
}: ContextModalProps<{
  review?: Review
  onConfirmText: string
  isEdit?: boolean
}>) {
  const { onConfirmText, isEdit, review } = innerProps
  const { closeModal } = context

  const { resource, setResource } = useResource()
  const { user } = useAuth()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const [isLoading, setIsLoading] = useState(false)
  const [comment, setComment] = useState(review?.comment ?? '')
  const [rating, setRating] = useState(review?.rating ?? 0)
  const [hover, setHover] = useState(0)

  const queryClient = useQueryClient()

  const createMutation = useMutation(createReview, {
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews'])
    }
  })

  const updateMutation = useMutation(updateReview, {
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews'])
    }
  })

  const handleSubmit = async () => {
    if (!comment || !rating) {
      showToastError({
        title: 'Preencha todos os campos',
        description: `Preencha o comentário e a nota para ${
          isEdit ? 'editar' : 'criar'
        }  a avaliação.`
      })

      return
    }

    if (comment.trim().length < 3) {
      showToastError({
        title: 'Comentário muito curto',
        description: 'Preencha o comentário com pelo menos 3 caracteres.'
      })

      return
    }

    setIsLoading(true)

    try {
      if (isEdit) {
        await updateMutation.mutateAsync({
          id: +review!.id,
          rating,
          comment
        })
      }

      if (!isEdit) {
        await createMutation.mutateAsync({
          comment,
          rating,
          resourceId: resource!.id,
          userId: user!.id
        })
      }
    } catch (error) {
      setIsLoading(false)

      showToastError({
        title: 'Não foi possível avaliar o recurso 😕',
        description: 'Por favor, tente novamente mais tarde.'
      })

      return
    }

    const updatedResource = await getResource(+resource!.id)
    setResource(updatedResource)

    setIsLoading(false)

    closeModal(id)
    showToast({
      title: isEdit ? 'Avaliação atualizada!' : 'Avaliação enviada!',
      description: isEdit
        ? 'Mudar de ideia faz parte 😉'
        : 'Agradecemos sua avaliação ✌️',
      icon: <MdStar size={24} color={theme.colors.brand[7]} />,
      dark
    })
  }

  return (
    <Stack spacing="md">
      <DefaultCloseButton onClick={() => closeModal(id)} title="Fechar Modal" />

      <DefaultOverlay visible={isLoading} />

      <Profile isModal author={user!.name} authorAvatar={user!.avatarUrl} />

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
          handleSubmit()
        }}
        onConfirmText={onConfirmText}
      />
    </Stack>
  )
}
