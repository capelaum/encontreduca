import { Box, Group } from '@mantine/core'
import { useAuth } from 'contexts/authContext'
import { useResource } from 'contexts/resourceContext'
import { MdOutlineDirections } from 'react-icons/md'
import { ActionButton } from './Actions/ActionButton'
import { ActionResourceChange } from './Actions/ActionResourceChange'
import { ActionResourceSave } from './Actions/ActionResourceSave'
import { ActionResourceVote } from './Actions/ActionResourceVote'
import { ActionReviewCreate } from './Actions/ActionReviewCreate'

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
          <ActionResourceChange />

          {!userResourceReview && <ActionReviewCreate />}

          {resource.approved ? <ActionResourceSave /> : null}

          {!resource.approved && <ActionResourceVote />}
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
