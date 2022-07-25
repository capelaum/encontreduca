import { useMantineColorScheme } from '@mantine/core'
import { useModals } from '@mantine/modals'
import {
  modalStyles,
  useModalStyles
} from 'components/Modal/Shared/modalStyles'
import { Title } from 'components/Shared/Title'
import { useSidebar } from 'contexts/sidebarContext'
import { MdStarBorder } from 'react-icons/md'
import { ActionButton } from '../ActionButton'

export function ReviewCreate() {
  const { openContextModal } = useModals()
  const { resource } = useSidebar()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { classes } = useModalStyles(dark)

  const openModalReviewCreate = () =>
    openContextModal('review', {
      title: <Title name={resource!.name} isModal />,
      ...modalStyles,
      classNames: classes,
      innerProps: {
        onConfirmText: 'Enviar'
      }
    })

  return (
    <ActionButton
      text="Avaliar"
      icon={<MdStarBorder size={28} />}
      onClick={openModalReviewCreate}
    />
  )
}
