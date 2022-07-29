import { LatLngLiteral } from './googleMaps'

export type ResourceType = {
  id: string | number
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
}

export type CategoryType = {
  id: number
  name: string
  created_at: string
  updated_at: string
}
