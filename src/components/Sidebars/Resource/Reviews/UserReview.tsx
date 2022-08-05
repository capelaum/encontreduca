import {
  CSSObject,
  Divider,
  Group,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { Profile } from 'components/Shared/Profile'
import { Stars } from 'components/Shared/Stars'
import { useResource } from 'contexts/resourceContext'
import { Review } from 'types/reviews'
import { Actions } from './Actions'

interface UserReviewProps {
  isOwnReview?: boolean
  review: Review
}

export function UserReview({ isOwnReview, review }: UserReviewProps) {
  const { created_at, comment, user: reviewUser, rating } = review
  const { user } = useResource()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const textStyles = (): CSSObject => ({
    color: dark ? theme.colors.gray[3] : theme.colors.gray[7],
    fontWeight: 400,
    lineHeight: 1.5
  })

  return (
    <>
      <Stack px="md" spacing={12}>
        <Group position="apart">
          <Profile user={reviewUser} />

          {user && <Actions isOwnReview={isOwnReview} review={review} />}
        </Group>

        <Group spacing={2} align="center">
          <Stars rating={rating} />

          <Text size="xs" ml="xs" sx={textStyles}>
            {created_at}
          </Text>
        </Group>

        <Text size="md" sx={textStyles}>
          {comment}
        </Text>
      </Stack>

      {isOwnReview && (
        <Divider
          my="md"
          size="xs"
          color="none"
          sx={{ color: dark ? theme.colors.gray[6] : theme.colors.gray[4] }}
        />
      )}
    </>
  )
}
