import { LatLngLiteral } from './googleMaps'

export type ResourceType = {
  id: number
  name: string
  categoryId: string
  category: string
  position: LatLngLiteral
  address: string
  website: string | null
  phone: string | null
  cover: string
  approved: boolean
  created_at: string
  updated_at: string
}
