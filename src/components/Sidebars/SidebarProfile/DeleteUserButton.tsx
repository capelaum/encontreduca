import { Button, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { useModals } from '@mantine/modals'
import { openModalConfirm } from 'components/Modals'
import { showToast } from 'components/Shared/ToastMessage'
import { useAuth } from 'contexts/authContext'
import { useSidebar } from 'contexts/sidebarContext'
import { deleteCookie } from 'cookies-next'
import { deleteUser } from 'lib/usersLib'
import { BsExclamationCircle } from 'react-icons/bs'
import { FaUserTimes } from 'react-icons/fa'
import { useModalStyles } from 'styles/modalStyles'

export function DeleteUserButton() {
  const { openConfirmModal, closeModal } = useModals()
  const { user, setUser, authUserCookieName } = useAuth()

  const { setProfileOpened } = useSidebar()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { classes } = useModalStyles(dark)

  const handleOnConfirm = async () => {
    await deleteUser(+user!.id)

    setProfileOpened(false)

    deleteCookie(authUserCookieName)

    setUser(null)

    showToast({
      title: 'Sua conta foi excluída!',
      description: 'É uma pena vermos você ir 😕',
      icon: <FaUserTimes size={24} color={theme.colors.brand[7]} />,
      dark
    })
  }

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
          onConfirm: () => handleOnConfirm(),
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
