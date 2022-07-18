import { Group } from '@mantine/core'
import { useSidebar } from 'contexts/sidebarContext'
import { MdDirections } from 'react-icons/md'
import { ActionButton } from './ActionButton'
import { ResourceChange } from './ModalActions/ResourceChange'
import { ResourceVote } from './ModalActions/ResourceVote'
import { ReviewCreate } from './ModalActions/ReviewCreate'

export function ActionButtons() {
  const { resource } = useSidebar()

  return (
    <Group spacing="lg" align="start" position="center" mt="md">
      <ActionButton text="Rotas" icon={<MdDirections size={28} />} />

      <ReviewCreate />

      <ResourceChange />

      {!resource?.approved && <ResourceVote />}
    </Group>
  )
}
