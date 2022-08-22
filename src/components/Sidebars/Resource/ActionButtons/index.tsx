import { Box, Group } from '@mantine/core'
import { useAuth } from 'contexts/authContext'
import { useResource } from 'contexts/resourceContext'
import { MdOutlineDirections } from 'react-icons/md'
import { ActionButton } from './ActionButton'
import { ResourceChange } from './ModalActions/ResourceChange'
import { ResourceVote } from './ModalActions/ResourceVote'
import { ReviewCreate } from './ModalActions/ReviewCreate'
import { ResourceSave } from './ResourceSave'

export function ActionButtons() {
  const { resource, userResourceReview } = useResource()
  const { user } = useAuth()

  if (!resource) {
    return null
  }

  const { latitude, longitude } = resource

  const directions = `https://www.google.com/maps/dir//${latitude},${longitude}/@${latitude},${longitude},14z`

  return (
    <Group spacing={32} align="start" mt="md">
      {user && (
        <>
          <ResourceChange />

          {!userResourceReview && <ReviewCreate />}

          {resource.approved ? <ResourceSave /> : null}

          {!resource.approved && <ResourceVote />}
        </>
      )}

      <Box
        href={directions}
        component="a"
        target="_blank"
        sx={{ textDecoration: 'none' }}
      >
        <ActionButton text="Rotas" icon={<MdOutlineDirections size={28} />} />
      </Box>
    </Group>
  )
}
