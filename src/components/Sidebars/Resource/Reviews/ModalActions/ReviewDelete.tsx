import {
  Box,
  Loader,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useModals } from '@mantine/modals'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { openModalConfirm } from 'components/Modals/ModalConfirrm'
import { useModalStyles } from 'components/Shared/styles/modalStyles'
import { showToastError } from 'components/Shared/ToastMessage'
import { useResource } from 'contexts/resourceContext'
import { getResource } from 'lib/loadResources'
import { deleteReview } from 'lib/reviewsLib'
import { BsTrashFill } from 'react-icons/bs'
import { toast } from 'react-toastify'
import { ActionItem } from '../ActionItem'

interface ReviewDeleteProps {
  reviewId: string | number
}

export function ReviewDelete({ reviewId }: ReviewDeleteProps) {
  const { resource, setResource } = useResource()

  const { openConfirmModal, closeModal } = useModals()

  const theme = useMantineTheme()
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { classes } = useModalStyles(dark)

  const queryClient = useQueryClient()

  const deleteMutation = useMutation(deleteReview, {
    onSuccess: () => {
      queryClient.invalidateQueries(['resources'])
    },
    onError: () => {
      showToastError({
        title: 'Ooops, ocorreu um erro ao deletar sua avaliação',
        description: 'Por favor, tente novamente mais tarde.'
      })
    }
  })

  const handleConfirmReviewDelete = async () => {
    const id = toast.loading('Excluindo...', {
      type: 'success',
      theme: dark ? 'dark' : 'light',
      icon: (
        <Loader
          size="sm"
          color={dark ? theme.colors.brand[7] : theme.colors.cyan[3]}
        />
      )
    })

    await deleteMutation.mutateAsync(+reviewId)

    const updatedResource = await getResource(+resource!.id)
    setResource(updatedResource)

    toast.update(id, {
      render: 'Avaliação excluída!',
      type: 'success',
      theme: dark ? 'dark' : 'light',
      isLoading: false,
      autoClose: 3000,
      icon: <BsTrashFill size={24} color={theme.colors.brand[7]} />
    })
  }

  return (
    <ActionItem
      onClick={() =>
        openModalConfirm({
          title: 'Quer excluir esta avaliação?',
          description: 'Não é possível recuperar Avaliações excluídas.',
          onConfirm: () => handleConfirmReviewDelete(),
          openConfirmModal,
          closeModal,
          classes,
          theme,
          dark
        })
      }
      icon={
        <BsTrashFill
          size={14}
          color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}
        />
      }
    >
      <Box ml={8} sx={{ width: '120px' }}>
        Excluir avaliação
      </Box>
    </ActionItem>
  )
}
