import { Group, Text, useMantineColorScheme } from '@mantine/core'
import { Stars } from 'components/Shared/Stars'
import { useResource } from 'contexts/resourceContext'

export function ReviewStats() {
  const { getAverageRating, resourceReviews } = useResource()
  const averageRating = getAverageRating(resourceReviews)

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  if (resourceReviews.length === 0) {
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
        {resourceReviews.length} avaliações
      </Text>
    </Group>
  )
}
