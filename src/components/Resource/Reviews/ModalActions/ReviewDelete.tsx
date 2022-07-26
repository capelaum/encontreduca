import {
  Box,
  Menu,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useModals } from '@mantine/modals'
import { CloseButton } from 'components/Modal/Shared/CloseButton'
import {
  modalStyles,
  useModalStyles
} from 'components/Modal/Shared/modalStyles'
import { Title } from 'components/Shared/Title'
import { showToast } from 'components/ToastMessage'
import { MdCancel, MdDelete } from 'react-icons/md'

export function ReviewDelete() {
  const { openConfirmModal, closeModal } = useModals()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { classes } = useModalStyles(dark)

  const openModalReviewDelete = () => {
    const id = openConfirmModal({
      classNames: classes,
      ...modalStyles,
      title: <Title name="Quer excluir esta avaliação?" isModal />,
      children: (
        <>
          <CloseButton onClick={() => closeModal(id)} />
          <Text color={dark ? theme.colors.gray[0] : theme.colors.gray[8]}>
            Não é possível recuperar Avaliações excluídas
          </Text>
        </>
      ),
      labels: { confirm: 'Confirmar', cancel: 'Cancelar' },
      cancelProps: {
        size: 'sm',
        radius: 'md',
        variant: 'outline',
        sx: {
          color: dark ? theme.colors.cyan[3] : theme.colors.brand[7],
          border: `1px solid ${
            dark ? theme.colors.cyan[3] : theme.colors.brand[7]
          }`
        }
      },
      confirmProps: {
        size: 'sm',
        radius: 'md',
        variant: 'filled',
        sx: {
          backgroundColor: dark ? theme.colors.cyan[3] : theme.colors.brand[7],
          color: dark ? theme.colors.brand[7] : theme.white,
          '&:hover': {
            backgroundColor: dark ? theme.colors.cyan[4] : theme.colors.brand[8]
          }
        }
      },
      onCancel: () => closeModal(id),
      onConfirm: () => {
        closeModal(id)
        showToast({
          title: 'Avaliação excluída',
          description: 'Avalie novamente quando quiser..',
          icon: <MdCancel size={24} color={theme.colors.brand[7]} />,
          dark
        })
      }
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
