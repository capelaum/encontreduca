import { Group, Text, useMantineColorScheme } from '@mantine/core'
import { Stars } from 'components/Shared/Stars'
import { useResource } from 'contexts/resourceContext'
import { Review } from 'types/reviews'

interface ReviewStatsProps {
  reviews: Review[]
}

export function ReviewStats({ reviews }: ReviewStatsProps) {
  const { getAverageRating } = useResource()
  const averageRating = getAverageRating(reviews)

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  if (reviews.length === 0) {
    return <Text size="sm">Sem avaliações</Text>
  }

  return (
    <Group align="center" spacing="sm">
      <Text size="sm" mt="xs">
        {averageRating.toFixed(1)}
      </Text>

      <Stars rating={averageRating} />

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
