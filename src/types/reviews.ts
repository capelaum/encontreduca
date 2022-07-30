import { User } from './users'

export type Review = {
  id: string | number
  user_id: string | number
  resource_id: string | number
  rating: number
  comment: string
  created_at: string
  updated_at: string
  user: User
}

export type NewReview = Pick<
  Review,
  'user_id' | 'resource_id' | 'rating' | 'comment'
>

export type UpdatedReview = Pick<
  Review,
  'id' | 'user_id' | 'resource_id' | 'rating' | 'comment'
>

export type NewReviewComplaint = {
  user_id: string | number
  review_id: string | number
  motive_id: string | number
}
