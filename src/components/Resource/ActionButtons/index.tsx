import { Group } from '@mantine/core'
import { useModals } from '@mantine/modals'
import { ModalResourceChange } from 'components/Modal/ModalResourceChange'
import { Title } from 'components/Shared/Title'
import { useSidebar } from 'contexts/sidebarContext'
import { MdDirections, MdEdit, MdStarBorder } from 'react-icons/md'
import { ActionButton } from './ActionButton'

export function ActionButtons() {
  const { resource } = useSidebar()

  const { openContextModal, openModal, closeModal } = useModals()

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

  const openResourceChangeModal = () => {
    const id = openModal({
      title: <Title name="Sugerir uma alteração" padding={20} />,
      radius: 'md',
      centered: true,
      withCloseButton: false,
      padding: 0,
      children: <ModalResourceChange onClose={() => closeModal(id)} />
    })
  }

  return (
    <Group spacing="lg" align="start" position="center" mt="md">
      <ActionButton text="Rotas" icon={<MdDirections size={28} />} />

      <ActionButton
        text="Avaliar"
        icon={<MdStarBorder size={28} />}
        onClick={openModalReviewCreate}
      />

      <ActionButton
        text="Sugerir Mudança"
        icon={<MdEdit size={28} />}
        onClick={openResourceChangeModal}
      />
    </Group>
  )
}
