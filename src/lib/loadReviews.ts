import { api } from 'services/api'
import { Review } from 'types/reviews'
import { dateFormatter } from 'utils/dataFormatter'

export async function loadReviews(): Promise<Review[]> {
  const { data } = await api.get('reviews')

  if (!data) {
    throw new Error('No reviews data returned from API')
  }

  const reviews = data.map((review: Review) => ({
    ...review,
    created_at: dateFormatter(review.created_at),
    updated_at: dateFormatter(review.updated_at)
  }))

  return reviews
}
