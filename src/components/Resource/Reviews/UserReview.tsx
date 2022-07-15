import { Divider, Group, Stack, Text } from '@mantine/core'
import { Profile } from 'components/Shared/Profile'
import { Stars } from 'components/Shared/Stars'
import { Actions } from './Actions'

interface UserReviewProps {
  isOwnReview?: boolean
}

export function UserReview({ isOwnReview }: UserReviewProps) {
  return (
    <>
      <Stack px="md" spacing={12}>
        <Group position="apart">
          <Profile />

          <Actions isOwnReview={isOwnReview} />
        </Group>

        <Group spacing={2} align="center">
          <Stars />

          <Text
            size="xs"
            ml="xs"
            sx={(theme) => ({
              color: theme.colors.gray[3],
              lineHeight: 1
            })}
          >
            10/06/22
          </Text>
        </Group>

        <Text
          sx={(theme) => ({
            color: theme.colors.gray[3],
            lineHeight: 1.5
          })}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mattis
          rutrum fames quam tempus vitae sed malesuada. Vulputate purus accumsan
          neque in vitae. Orci venenatis turpis rutrum vitae diam sed. At
          placerat elit mattis nam nunc. Nibh donec sagittis, sed enim felis
          mollis vitae aliquet varius. Blandit donec vestibulum, fermentum et
          pretium.
        </Text>
      </Stack>

      {isOwnReview && (
        <Divider
          my="md"
          size="xs"
          color="none"
          sx={(theme) => ({ color: theme.colors.gray[6] })}
        />
      )}
    </>
  )
}
