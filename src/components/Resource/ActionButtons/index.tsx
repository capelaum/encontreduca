import { Group } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useSidebar } from 'contexts/sidebarContext'
import { MdDirections } from 'react-icons/md'
import { ActionButton } from './ActionButton'
import { ResourceChange } from './ModalActions/ResourceChange'
import { ResourceVote } from './ModalActions/ResourceVote'
import { ReviewCreate } from './ModalActions/ReviewCreate'
import { ResourceSave } from './ResourceSave'

export function ActionButtons() {
  const largeScreen = useMediaQuery('(min-width: 768px)', false)

  const { resource } = useSidebar()

  return (
    <Group
      spacing={32}
      align="start"
      position={largeScreen ? 'center' : 'left'}
      mt="md"
    >
      <ActionButton text="Rotas" icon={<MdDirections size={28} />} />

      {resource?.approved && <ResourceSave />}

      <ResourceChange />

      <ReviewCreate />

      {!resource?.approved && <ResourceVote />}
    </Group>
  )
}
