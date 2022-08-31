import { Box, Stack } from '@mantine/core'
import { DefaultLoadMoreButton } from 'components/Shared/Default/DefaultLoadMoreButton'
import { useResource } from 'contexts/resourceContext'
import { useEffect, useState } from 'react'
import { SectionTitle } from './SectionTitle'
import { UserReview } from './UserReview'

export function Reviews() {
  const [end, setEnd] = useState(3)

  const { resource, userResourceReview, reviewsWithoutUser } = useResource()

  useEffect(() => {
    setEnd(3)
  }, [resource])

  return (
    <Box>
      {!!userResourceReview && (
        <>
          <SectionTitle title="Sua avaliação" />
          <UserReview review={userResourceReview} isOwnReview />
        </>
      )}

      {reviewsWithoutUser.length > 0 && <SectionTitle title="Avaliações" />}

      <Stack spacing={48} mb={32}>
        {reviewsWithoutUser.slice(0, end).map((review) => (
          <UserReview key={review.id} review={review} />
        ))}
      </Stack>

      {reviewsWithoutUser.length - end > 0 && (
        <DefaultLoadMoreButton
          end={end}
          step={3}
          setEnd={setEnd}
          data={reviewsWithoutUser}
        />
      )}
    </Box>
  )
}
