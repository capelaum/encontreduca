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
  latitude: string | number
  longitude: string | number
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

export type NewResource = {
  user_id: string | number
  name: string
  category_id: string | number
  latitude: string | number
  longitude: string | number
  address: string
  phone: string | null
  website: string | null
  cover: string
}

export type NewResourceComplaint = {
  user_id: string | number
  resource_id: string | number
  motive_id: string | number
}

export interface ResourceFormValues {
  resourceName: string
  resourceAddress: string
  resourcePhone: string
  resourceWebsite: string
  categoryId: string | number
  resourceCover: string
  latitude: number
  longitude: number
}
