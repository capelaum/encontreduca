import {
  Button,
  Center,
  Stack,
  Title,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { Review } from 'types/reviews'
import { UserReview } from './UserReview'

interface ReviewsProps {
  reviews: Review[]
}

export function Reviews({ reviews }: ReviewsProps) {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <>
      <Title
        order={2}
        px="md"
        mb={24}
        sx={{
          fontSize: theme.fontSizes.lg
        }}
      >
        Sua avaliação
      </Title>

      <UserReview review={reviews[0]} isOwnReview />

      <Title
        order={2}
        px="md"
        mb={24}
        sx={{
          fontSize: theme.fontSizes.lg
        }}
      >
        Avaliações
      </Title>

      <Stack spacing={24} mb={32}>
        {reviews.slice(0, 3).map((review) => (
          <UserReview key={review.id} review={review} />
        ))}
      </Stack>

      {reviews.length > 3 && (
        <Center mb={32}>
          <Button
            variant="subtle"
            compact
            size="sm"
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
