import { CategoryType } from './categories'
import { LatLngLiteral } from './googleMaps'
import { Review } from './reviews'
import { User } from './users'

export type ResourceType = {
  id: string | number
  user: User
  reviews: Review[]
  votes: ResourceVote[]
  user_id: string | number

  name: string
  category_id: string
  category: CategoryType
  address: string
  website: string | null
  phone: string | null
  cover: string
  latitude: number
  longitude: number
  position: LatLngLiteral
  approved: boolean

  created_at: string
  updated_at: string
}

export type NewResource = Pick<
  ResourceType,
  | 'user_id'
  | 'name'
  | 'category_id'
  | 'latitude'
  | 'longitude'
  | 'address'
  | 'phone'
  | 'website'
  | 'cover'
>

export type ResourceFormValues = Omit<NewResource, 'user_id'>

export type NewResourceComplaint = {
  user_id: string | number
  resource_id: string | number
  motive_id: string | number
}

export type ResourceChange = {
  user_id: string | number
  resource_id: string | number
  field: string
  old_value: string
  new_value: string
}

export type ResourceVote = {
  user_id: string | number
  resource_id: string | number
  vote: boolean
  justification: string

  created_at: string
  updated_at: string
}
