import { User } from './users'

export type Review = {
  id: string | number
  userId: string | number
  resourceId: string | number
  rating: number
  comment: string
  updatedAt: string
  user: User
}

export type NewReview = Pick<
  Review,
  'userId' | 'resourceId' | 'rating' | 'comment'
>

export type UpdatedReview = Pick<Review, 'id' | 'rating' | 'comment'>

export type NewReviewComplaint = {
  userId: string | number
  reviewId: string | number
  motiveId: string | number
}
