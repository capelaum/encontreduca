import { Group, Text, useMantineColorScheme } from '@mantine/core'
import { Stars } from 'components/Shared/Stars'
import { useResource } from 'contexts/resourceContext'

export function ReviewStats() {
  const { resourceReviewsAverageRating, resourceReviewsQuantity } =
    useResource()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  if (resourceReviewsQuantity === 0) {
    return <Text size="sm">Sem avaliações</Text>
  }

  const renderReviewsQuantity = () => {
    if (resourceReviewsQuantity === 1) {
      return <Text size="sm">1 avaliação</Text>
    }

    return <Text size="sm">{resourceReviewsQuantity} avaliações</Text>
  }

  return (
    <Group align="center" spacing="sm">
      <Text size="sm" mt="xs">
        {resourceReviewsAverageRating.toFixed(1)}
      </Text>

      <Stars rating={resourceReviewsAverageRating} />

      <Text
        size="sm"
        mt="xs"
        sx={(theme) => ({
          fontWeight: 500,
          color: dark ? theme.colors.cyan[3] : theme.colors.brand[7]
        })}
      >
        {renderReviewsQuantity()}
      </Text>
    </Group>
  )
}
