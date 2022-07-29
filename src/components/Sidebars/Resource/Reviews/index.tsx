import {
  Button,
  Center,
  Stack,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useResource } from 'contexts/resourceContext'
import { useEffect, useState } from 'react'
import { Review } from 'types/reviews'
import { SectionTitle } from './SectionTitle'
import { UserReview } from './UserReview'

interface ReviewsProps {
  reviews: Review[]
}

export function Reviews({ reviews }: ReviewsProps) {
  const theme = useMantineTheme()
  const { resource } = useResource()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const [end, setEnd] = useState(3)

  useEffect(() => {
    setEnd(3)
  }, [resource])

  return (
    <>
      <SectionTitle title="Sua avaliação" />

      <UserReview review={reviews[0]} isOwnReview />

      <SectionTitle title="Avaliações" />

      <Stack spacing={48} mb={32}>
        {reviews.slice(0, end).map((review) => (
          <UserReview key={review.id} review={review} />
        ))}
      </Stack>

      {reviews.length - end > 0 && (
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
            Mais avalições ({reviews.length - 3})
          </Button>
        </Center>
      )}
    </>
  )
}
