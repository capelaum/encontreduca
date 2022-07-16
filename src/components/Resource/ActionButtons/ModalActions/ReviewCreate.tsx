import { useModals } from '@mantine/modals'
import { Title } from 'components/Shared/Title'
import { useSidebar } from 'contexts/sidebarContext'
import { MdStarBorder } from 'react-icons/md'
import { ActionButton } from '../ActionButton'

export function ReviewCreate() {
  const { openContextModal } = useModals()
  const { resource } = useSidebar()

  const openModalReviewCreate = () =>
    openContextModal('review', {
      title: <Title name={resource!.name} />,
      radius: 'md',
      centered: true,
      withCloseButton: false,
      padding: 'md',
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
