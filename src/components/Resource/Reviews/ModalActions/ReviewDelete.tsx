import {
  Box,
  Menu,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useModals } from '@mantine/modals'
import { openModalConfirm } from 'components/Modal/ModalConfirrm'
import { useModalStyles } from 'components/Modal/Shared/modalStyles'
import { MdCancel, MdDelete } from 'react-icons/md'

export function ReviewDelete() {
  const { openConfirmModal, closeModal } = useModals()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { classes } = useModalStyles(dark)

  return (
    <Menu.Item icon={<MdDelete size={14} color="cyan" />}>
      <Box
        ml={8}
        onClick={() =>
          openModalConfirm({
            title: 'Quer excluir esta avaliação?',
            description: 'Não é possível recuperar Avaliações excluídas.',
            toast: {
              title: 'Avaliação excluída!',
              description: 'Pode avaliar novamente quando quiser.',
              icon: <MdCancel size={24} color={theme.colors.brand[7]} />,
              dark
            },
            openConfirmModal,
            closeModal,
            classes,
            theme,
            dark
          })
        }
      >
        Excluir avaliação
      </Box>
    </Menu.Item>
  )
}
