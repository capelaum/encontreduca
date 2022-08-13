import { Box, Group } from '@mantine/core'
import { useAuth } from 'contexts/authContext'
import { useResource } from 'contexts/resourceContext'
import { MdDirections } from 'react-icons/md'
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

  const {
    position: { lat, lng }
  } = resource

  const directions = `https://www.google.com/maps/dir//${lat},${lng}/@${lat},${lng},14z`

  return (
    <Group spacing={32} align="start" mt="md">
      <Box
        href={directions}
        component="a"
        target="_blank"
        sx={{ textDecoration: 'none' }}
      >
        <ActionButton text="Rotas" icon={<MdDirections size={28} />} />
      </Box>

      {user && (
        <>
          {resource.approved ? <ResourceSave /> : null}

          <ResourceChange />

          {!userResourceReview && <ReviewCreate />}

          {!resource.approved && <ResourceVote />}
        </>
      )}
    </Group>
  )
}
