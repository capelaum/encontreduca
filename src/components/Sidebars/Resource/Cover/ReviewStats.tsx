import { Group, Text, useMantineColorScheme } from '@mantine/core'
import { Stars } from 'components/Shared/Stars'
import { Review } from 'types/reviews'

interface ReviewStatsProps {
  reviews: Review[]
}

export function ReviewStats({ reviews }: ReviewStatsProps) {
  const average =
    reviews.reduce((acc, { rating }) => acc + rating, 0) / reviews.length

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  if (reviews.length === 0) {
    return <Text size="sm">Sem avaliações</Text>
  }

  return (
    <Group align="center" spacing="sm">
      <Text size="sm" mt="xs">
        {average.toFixed(1)}
      </Text>

      <Group spacing={2}>
        <Stars />
      </Group>

      <Text
        size="sm"
        mt="xs"
        sx={(theme) => ({
          fontWeight: 500,
          color: dark ? theme.colors.cyan[3] : theme.colors.brand[7]
        })}
      >
        {reviews.length} avaliações
      </Text>
    </Group>
  )
}
