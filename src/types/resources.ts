import { CategoryType } from './categories'
import { LatLngLiteral } from './googleMaps'
import { Review } from './reviews'
import { User } from './users'

export type ResourceType = {
  id: string | number
  user_id: string | number
  name: string
  category_id: string | number
  category: CategoryType
  latitude: string
  longitude: string
  position: LatLngLiteral
  address: string
  website: string | null
  phone: string | null
  cover: string
  approved: boolean
  created_at: string
  updated_at: string
  user: User
  reviews: Review[]
}

export type NewResourceComplaint = {
  user_id: string | number
  resource_id: string | number
  motive_id: string | number
}
