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
import { Actions } from './Actions'

interface UserReviewProps {
  isOwnReview?: boolean
}

export function UserReview({ isOwnReview }: UserReviewProps) {
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
          <Profile />

          <Actions isOwnReview={isOwnReview} />
        </Group>

        <Group spacing={2} align="center">
          <Stars />

          <Text size="xs" ml="xs" sx={textStyles}>
            10/06/22
          </Text>
        </Group>

        <Text sx={textStyles}>
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
          sx={{ color: dark ? theme.colors.gray[6] : theme.colors.gray[4] }}
        />
      )}
    </>
  )
}
