import { Group } from '@mantine/core'
import { useResource } from 'contexts/resourceContext'
import { MdDirections } from 'react-icons/md'
import { ActionButton } from './ActionButton'
import { ResourceChange } from './ModalActions/ResourceChange'
import { ResourceVote } from './ModalActions/ResourceVote'
import { ReviewCreate } from './ModalActions/ReviewCreate'
import { ResourceSave } from './ResourceSave'

interface ActionButtonsProps {
  userHasResourceReview: boolean
}

export function ActionButtons({ userHasResourceReview }: ActionButtonsProps) {
  const { resource } = useResource()

  return (
    <Group spacing={32} align="start" mt="md">
      <ActionButton text="Rotas" icon={<MdDirections size={28} />} />

      {resource?.approved && <ResourceSave />}

      <ResourceChange />

      {!userHasResourceReview && <ReviewCreate />}

      {!resource?.approved && <ResourceVote />}
    </Group>
  )
}
