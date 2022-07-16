import { Text } from '@mantine/core'
import { useModals } from '@mantine/modals'
import { CloseButton } from 'components/Modal/Shared/CloseButton'
import { Title } from 'components/Shared/Title'

export const openModalUserDelete = () => {
  const { openConfirmModal, closeModal } = useModals()

  const id = openConfirmModal({
    radius: 'md',
    centered: true,
    withCloseButton: false,
    padding: 'md',
    title: <Title name="Quer mesmo excluir sua conta?" />,
    children: (
      <>
        <CloseButton onClick={() => closeModal(id)} />
        <Text>Não é possível recuperar sua conta após a exclusão!</Text>
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
