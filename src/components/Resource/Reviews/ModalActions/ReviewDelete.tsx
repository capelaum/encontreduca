import { Box, Menu, Text } from '@mantine/core'
import { useModals } from '@mantine/modals'
import { CloseButton } from 'components/Modal/Shared/CloseButton'
import { Title } from 'components/Shared/Title'
import { MdDelete } from 'react-icons/md'

export function ReviewDelete() {
  const { openConfirmModal, closeModal } = useModals()

  const openModalReviewDelete = () => {
    const id = openConfirmModal({
      radius: 'md',
      centered: true,
      withCloseButton: false,
      padding: 'md',
      title: <Title name="Quer excluir esta avaliação?" />,
      children: (
        <>
          <CloseButton onClick={() => closeModal(id)} />
          <Text>Não é possível recuperar Avaliações excluídas</Text>
        </>
      ),
      labels: { confirm: 'Confirmar', cancel: 'Cancelar' },
      cancelProps: {
        size: 'sm',
        radius: 'md',
        variant: 'outline'
      },
      confirmProps: {
        size: 'sm',
        radius: 'md',
        variant: 'default',
        sx: (theme) => ({
          backgroundColor: theme.colors.cyan[3],
          color: theme.colors.brand[7],
          '&:hover': {
            backgroundColor: theme.colors.cyan[4]
          }
        })
      },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => console.log('Confirmed')
    })
  }

  return (
    <Menu.Item icon={<MdDelete size={14} color="cyan" />}>
      <Box ml={8} onClick={openModalReviewDelete}>
        Excluir avaliação
      </Box>
    </Menu.Item>
  )
}
