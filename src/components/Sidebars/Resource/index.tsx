import { Box, Stack } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useResource } from 'contexts/resourceContext'
import { useSidebar } from 'contexts/sidebarContext'
import { useEffect, useState } from 'react'
import { Review } from 'types/reviews'
import { ActionButtons } from './ActionButtons'
import { Cover } from './Cover'
import { Header } from './Header'
import { Info } from './Info'
import { Reviews } from './Reviews'

interface ResourceProps {
  reviews: Review[]
}

export function Resource({ reviews }: ResourceProps) {
  const [resourceReviews, setResourceReviews] = useState<Review[]>(
    [] as Review[]
  )

  const largeScreen = useMediaQuery('(min-width: 768px)', false)

  const { setResourceOpened } = useSidebar()
  const { resource, getUserResourceReview } = useResource()

  if (!resource) {
    setResourceOpened(false)
    return null
  }

  useEffect(() => {
    if (resource) {
      const getResourceReviews = reviews.filter(
        ({ resource_id }) => resource.id === resource_id
      )

      setResourceReviews(getResourceReviews)
    }
  }, [resource])

  const userResourceReview = getUserResourceReview(resourceReviews)

  return (
    <Box>
      <Stack
        mt={resource.approved && largeScreen ? 88 : 'md'}
        px="md"
        spacing="md"
      >
        <Header />

        <Cover reviews={resourceReviews} />

        <ActionButtons userHasResourceReview={!!userResourceReview} />
      </Stack>

      <Info />

      {resourceReviews.length > 0 && (
        <Reviews resourceReviews={resourceReviews} />
      )}
    </Box>
  )
}
