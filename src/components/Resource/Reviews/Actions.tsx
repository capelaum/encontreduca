import { Box, Menu, Text } from '@mantine/core'
import { useModals } from '@mantine/modals'
import { Title } from 'components/Shared/Title'
import { useSidebar } from 'contexts/sidebarContext'
import { MdDelete, MdEdit } from 'react-icons/md'
import { TiCancel } from 'react-icons/ti'

interface ActionsProps {
  isOwnReview?: boolean
}

export function Actions({ isOwnReview }: ActionsProps) {
  const { openContextModal, openConfirmModal } = useModals()
  const { resource } = useSidebar()

  const openModalReviewEdit = () =>
    openContextModal('review_create', {
      title: <Title name={resource!.name} />,
      radius: 'md',
      centered: true,
      withCloseButton: true,
      padding: 'md',
      innerProps: {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mattis rutrum fames quam tempus vitae sed malesuada. Vulputate purus accumsan neque in vitae. Orci venenatis turpis rutrum vitae diam sed. At placerat elit mattis nam nunc. Nibh donec sagittis, sed enim felis mollis vitae aliquet varius. Blandit donec vestibulum, fermentum et pretium.'
      }
    })

  const openModalReviewDelete = () =>
    openConfirmModal({
      title: <Title name="Quer excluir esta avaliação?" />,
      children: <Text>Não é possível recuperar Avaliações excluídas</Text>,
      labels: { confirm: 'Confirmar', cancel: 'Cancelar' },
      radius: 'md',
      centered: true,
      withCloseButton: true,
      padding: 'md',
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

  const openModalReviewComplain = () =>
    openContextModal('review_create', {
      title: <Title name={resource!.name} />,
      radius: 'md',
      centered: true,
      withCloseButton: true,
      padding: 'md',
      innerProps: {
        text: 'Comentário de avaliação'
      }
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
