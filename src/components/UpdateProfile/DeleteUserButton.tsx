import {
  Button,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useModals } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { CloseButton } from 'components/Modal/Shared/CloseButton'
import { Title } from 'components/Shared/Title'
import { BsExclamationCircle } from 'react-icons/bs'
import { FaUserTimes } from 'react-icons/fa'
import { notificationStyles } from 'styles/notificationStyles'

export function DeleteUserButton() {
  const { openConfirmModal, closeModal } = useModals()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const openModalUserDelete = () => {
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
        sx: () => ({
          backgroundColor: theme.colors.cyan[3],
          color: theme.colors.brand[7],
          '&:hover': {
            backgroundColor: theme.colors.cyan[4]
          }
        })
      },
      onCancel: () => closeModal(id),
      onConfirm: () => {
        showNotification({
          title: 'Sua conta foi excluída com sucesso!',
          message: 'É uma pena vermos você ir 😕',
          icon: <FaUserTimes size={24} color={theme.colors.brand[8]} />,
          styles: notificationStyles(theme, dark)
        })
      }
    })
  }

  return (
    <Button
      size="sm"
      radius="md"
      variant="default"
      leftIcon={<BsExclamationCircle size={18} />}
      onClick={openModalUserDelete}
      sx={{
        backgroundColor: theme.colors.red[8],
        color: 'white',
        border: 'none',
        '&:hover': {
          backgroundColor: theme.colors.red[9]
        }
      }}
    >
      Excluir conta
    </Button>
  )
}
