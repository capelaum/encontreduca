import { Box, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { useModals } from '@mantine/modals'
import { Title } from 'components/Shared'
import {
  modalStyles,
  useModalStyles
} from 'components/Shared/styles/modalStyles'
import { useSidebar } from 'contexts/sidebarContext'
import { MdEdit } from 'react-icons/md'
import { ActionItem } from '../ActionItem'

export function ReviewEdit() {
  const { openContextModal } = useModals()
  const { resource } = useSidebar()

  const theme = useMantineTheme()

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
    <ActionItem
      onClick={openModalReviewEdit}
      icon={
        <MdEdit
          size={14}
          color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}
        />
      }
    >
      <Box ml={8} sx={{ width: '120px' }}>
        Editar avaliação
      </Box>
    </ActionItem>
  )
}
