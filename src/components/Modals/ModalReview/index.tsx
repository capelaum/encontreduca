import {
  Group,
  LoadingOverlay,
  Stack,
  Textarea,
  UnstyledButton,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { ContextModalProps } from '@mantine/modals'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ConfirmButtons } from 'components/Shared/ConfirmButtons'
import { Profile } from 'components/Shared/Profile'
import { textareaStyles } from 'components/Shared/styles/inputStyles'
import { showToast, showToastError } from 'components/Shared/ToastMessage'
import { useResource } from 'contexts/resourceContext'
import { getResource } from 'lib/loadResources'
import { useState } from 'react'
import { MdStar, MdStarBorder } from 'react-icons/md'
import { api } from 'services/api'
import { NewReview, Review } from 'types/reviews'
import { defaultUser } from 'utils/defaultUser'
import { DefaultCloseButton } from '../../Shared/DefaultCloseButton'

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

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const [isLoading, setIsLoading] = useState(false)
  const [comment, setComment] = useState(review?.comment ?? '')
  const [rating, setRating] = useState(review?.rating ?? 0)
  const [hover, setHover] = useState(0)

  const createReview = async (newReview: NewReview) => {
    const response = await api.post('/reviews', newReview)

    return response.data
  }

  const queryClient = useQueryClient()

  const mutation = useMutation(createReview, {
    onSuccess: () => {
      queryClient.invalidateQueries(['resources'])
    }
  })

  const handleSubmit = async () => {
    if (!comment || !rating) {
      showToastError({
        title: 'Preencha todos os campos',
        description: isEdit
          ? 'Preencha o comentário e a nota para editar a avaliação.'
          : 'Preencha o comentário e a nota para criar a avaliação.'
      })

      return
    }

    setIsLoading(true)

    await mutation.mutateAsync({
      comment,
      rating,
      resource_id: resource!.id,
      user_id: defaultUser.id
    })

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

      <LoadingOverlay
        visible={isLoading}
        overlayBlur={2}
        overlayOpacity={0.3}
        overlayColor={dark ? theme.black : theme.white}
        sx={{
          svg: { stroke: dark ? theme.colors.cyan[3] : theme.colors.brand[7] }
        }}
      />

      <Profile isModal user={review?.user ?? defaultUser} />

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
