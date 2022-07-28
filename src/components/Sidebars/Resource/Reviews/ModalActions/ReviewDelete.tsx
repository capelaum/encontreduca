import { Box, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { useModals } from '@mantine/modals'
import { openModalConfirm } from 'components/Modals/ModalConfirrm'
import { useModalStyles } from 'components/Shared/styles/modalStyles'
import { showToast } from 'components/Shared/ToastMessage'
import { BsTrashFill } from 'react-icons/bs'
import { MdCancel } from 'react-icons/md'
import { ActionItem } from '../ActionItem'

export function ReviewDelete() {
  const { openConfirmModal, closeModal } = useModals()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { classes } = useModalStyles(dark)

  return (
    <ActionItem
      onClick={() =>
        openModalConfirm({
          title: 'Quer excluir esta avaliação?',
          description: 'Não é possível recuperar Avaliações excluídas.',
          onConfirm: () =>
            showToast({
              title: 'Avaliação excluída!',
              description: 'Pode avaliar novamente quando quiser.',
              icon: <MdCancel size={24} color={theme.colors.brand[7]} />,
              dark
            }),
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
