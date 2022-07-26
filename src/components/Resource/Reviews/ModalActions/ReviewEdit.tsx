import { Box, Menu, useMantineColorScheme } from '@mantine/core'
import { useModals } from '@mantine/modals'
import {
  modalStyles,
  useModalStyles
} from 'components/Modal/Shared/modalStyles'
import { Title } from 'components/Shared/Title'
import { useSidebar } from 'contexts/sidebarContext'
import { MdEdit } from 'react-icons/md'

export function ReviewEdit() {
  const { openContextModal } = useModals()
  const { resource } = useSidebar()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { classes } = useModalStyles(dark)

  const openModalReviewEdit = () =>
    openContextModal('review', {
      title: <Title name={resource!.name} isModal />,
      ...modalStyles,
      classNames: classes,
      innerProps: {
        isEdit: true,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mattis rutrum fames quam tempus vitae sed malesuada. Vulputate purus accumsan neque in vitae. Orci venenatis turpis rutrum vitae diam sed. At placerat elit mattis nam nunc. Nibh donec sagittis, sed enim felis mollis vitae aliquet varius. Blandit donec vestibulum, fermentum et pretium.',
        onConfirmText: 'Atualizar'
      }
    })

  return (
    <Menu.Item icon={<MdEdit size={14} color="cyan" />}>
      <Box ml={8} onClick={openModalReviewEdit}>
        Editar avaliação
      </Box>
    </Menu.Item>
  )
}
