import { api } from 'services/api'
import { NewResourceComplaint } from 'types/resources'
import { NewReviewComplaint } from 'types/reviews'

export async function createResourceComplaint(
  newResourceComplaint: NewResourceComplaint
) {
  const response = await api.post('/resources/complaints', newResourceComplaint)

  return response.data
}

export async function createReviewComplaint(
  newReviewComplaint: NewReviewComplaint
) {
  const response = await api.post('/reviews/complaints', newReviewComplaint)

  return response.data
}
