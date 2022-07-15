import { Group } from '@mantine/core'
import { useModals } from '@mantine/modals'
import { Title } from 'components/Shared/Title'
import { useSidebar } from 'contexts/sidebarContext'
import { MdDirections, MdEdit, MdStarBorder } from 'react-icons/md'
import { ActionButton } from './ActionButton'

export function ActionButtons() {
  const { resource } = useSidebar()

  const { openContextModal } = useModals()

  const openModalReviewCreate = () =>
    openContextModal('review_create', {
      title: <Title name={resource!.name} />,
      radius: 'md',
      centered: true,
      withCloseButton: true,
      padding: 'md',
      innerProps: {}
    })

  return (
    <Group spacing="lg" align="start" position="center" mt="md">
      <ActionButton text="Rotas" icon={<MdDirections size={28} />} />

      <ActionButton
        text="Avaliar"
        icon={<MdStarBorder size={28} />}
        onClick={openModalReviewCreate}
      />

      <ActionButton text="Sugerir Mudança" icon={<MdEdit size={28} />} />
    </Group>
  )
}
