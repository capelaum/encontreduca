import { Button, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { useModals } from '@mantine/modals'
import { openModalConfirm } from 'components/Modals/ModalConfirrm'
import { useModalStyles } from 'components/Modals/Shared/modalStyles'
import { showToast } from 'components/Shared/ToastMessage'
import { BsExclamationCircle } from 'react-icons/bs'
import { FaUserTimes } from 'react-icons/fa'

export function DeleteUserButton() {
  const { openConfirmModal, closeModal } = useModals()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { classes } = useModalStyles(dark)

  return (
    <Button
      size="sm"
      radius="md"
      variant="default"
      leftIcon={<BsExclamationCircle size={18} />}
      onClick={() =>
        openModalConfirm({
          title: 'Quer mesmo excluir sua conta?',
          description: 'Não é possível recuperar sua conta após a exclusão!',
          onConfirm: () =>
            showToast({
              title: 'Sua conta foi excluída!',
              description: 'É uma pena vermos você ir 😕',
              icon: <FaUserTimes size={24} color={theme.colors.brand[7]} />,
              dark
            }),
          openConfirmModal,
          closeModal,
          classes,
          theme,
          dark
        })
      }
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
