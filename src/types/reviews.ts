export type Review = {
  id: string | number
  userId: string | number
  resourceId: string | number
  rating: number
  comment: string
  updatedAt: string
  author: string
  authorAvatar: string
  authorReviewCount: number
}

export type NewReview = Pick<Review, 'resourceId' | 'rating' | 'comment'>

export type UpdatedReview = Pick<Review, 'id' | 'rating' | 'comment'>

export type NewReviewComplaint = {
  reviewId: string | number
  motiveId: string | number
}
