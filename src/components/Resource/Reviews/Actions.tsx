import { Box, Menu, Text } from '@mantine/core'
import { useModals } from '@mantine/modals'
import { CloseButton } from 'components/Modal/Shared/CloseButton'
import { Title } from 'components/Shared/Title'
import { useSidebar } from 'contexts/sidebarContext'
import data from 'data/motives.json'
import { MdDelete, MdEdit } from 'react-icons/md'
import { TiCancel } from 'react-icons/ti'
import { getModalSelectDataMotives } from 'utils/modalSelecDataFormatter'

interface ActionsProps {
  isOwnReview?: boolean
}

export function Actions({ isOwnReview }: ActionsProps) {
  const { openContextModal, openConfirmModal, closeModal } = useModals()
  const { resource } = useSidebar()
  const reviewMotives = getModalSelectDataMotives(data.motives, 'review')

  const openModalReviewEdit = () =>
    openContextModal('review', {
      title: <Title name={resource!.name} />,
      radius: 'md',
      centered: true,
      withCloseButton: false,
      padding: 'md',
      innerProps: {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mattis rutrum fames quam tempus vitae sed malesuada. Vulputate purus accumsan neque in vitae. Orci venenatis turpis rutrum vitae diam sed. At placerat elit mattis nam nunc. Nibh donec sagittis, sed enim felis mollis vitae aliquet varius. Blandit donec vestibulum, fermentum et pretium.',
        onConfirmText: 'Atualizar'
      }
    })

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
            backgroundColor: theme.colors.cyan[4],
            color: theme.colors.brand[8]
          }
        })
      },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => console.log('Confirmed')
    })
  }

  const openModalReviewComplain = () =>
    openContextModal('select', {
      title: <Title name="Denunciar avaliação" />,
      radius: 'md',
      centered: true,
      withCloseButton: false,
      padding: 'md',
      innerProps: { data: reviewMotives }
    })

  function renderMenuItems() {
    if (isOwnReview) {
      return (
        <>
          <Menu.Item icon={<MdEdit size={14} color="cyan" />}>
            <Box ml={8} onClick={openModalReviewEdit}>
              Editar avaliação
            </Box>
          </Menu.Item>
          <Menu.Item icon={<MdDelete size={14} color="cyan" />}>
            <Box ml={8} onClick={openModalReviewDelete}>
              Excluir avaliação
            </Box>
          </Menu.Item>
        </>
      )
    }

    return (
      <Menu.Item icon={<TiCancel size={18} color="cyan" />}>
        <Box ml={8} onClick={openModalReviewComplain}>
          Sinalizar como inadequado
        </Box>
      </Menu.Item>
    )
  }

  return (
    <Menu
      position="right"
      sx={{ transform: 'rotate(90deg)' }}
      transition="pop-top-left"
      size={isOwnReview ? 'sm' : 230}
    >
      {renderMenuItems()}
    </Menu>
  )
}
