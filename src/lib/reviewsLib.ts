import { api } from 'services/api'
import { NewReview, Review, UpdatedReview } from 'types/reviews'
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

export async function createReview(newReview: NewReview) {
  const response = await api.post('/reviews', newReview)

  return response.data
}

export async function updateReview(updatedReview: UpdatedReview) {
  const response = await api.put(`/reviews/${updatedReview.id}`, updatedReview)

  return response.data
}

export async function deleteReview(reviewId: number) {
  const response = await api.delete(`/reviews/${reviewId}`)

  return response.data
}
