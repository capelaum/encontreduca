import {
  Button,
  Center,
  Stack,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { DefaultOverlay } from 'components/Shared/Default/DefaultOverlay'
import { useResource } from 'contexts/resourceContext'
import { useEffect, useState } from 'react'
import { SectionTitle } from './SectionTitle'
import { UserReview } from './UserReview'

export function Reviews() {
  const {
    resource,
    resourceReviews,
    isFetchingResourceData,
    getUserResourceReview,
    getReviewsWithoutUser
  } = useResource()

  const userResourceReview = getUserResourceReview(resourceReviews)

  const reviewsWithoutUser = getReviewsWithoutUser(resourceReviews)

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const [end, setEnd] = useState(3)

  useEffect(() => {
    setEnd(3)
  }, [resource])

  return (
    <>
      <DefaultOverlay visible={isFetchingResourceData} />
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
        <Center mb={32}>
          <Button
            variant="subtle"
            compact
            size="sm"
            onClick={() => setEnd(() => end + 3)}
            sx={{
              color: dark ? theme.colors.cyan[3] : theme.colors.brand[7],
              '&:hover': {
                backgroundColor: dark
                  ? theme.colors.brand[8]
                  : theme.colors.gray[1]
              }
            }}
          >
            Mais avalições ({reviewsWithoutUser.length - 3})
          </Button>
        </Center>
      )}
    </>
  )
}
