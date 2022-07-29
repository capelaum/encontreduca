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
