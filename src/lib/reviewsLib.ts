import { api } from 'services/api'
import { NewReview, Review, UpdatedReview } from 'types/reviews'

export async function loadReviews(): Promise<Review[]> {
  const response = await api.get('reviews')

  if (response.status !== 200) {
    throw new Error('An error occurred while fetching reviews')
  }

  const { data } = response

  return data
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
