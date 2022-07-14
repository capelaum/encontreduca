export type ResourceType = {
  id: number
  name: string
  category: string
  position: {
    latitude: number
    longitude: number
  }
  address: string
  website: string | null
  phone: string | null
  cover: string
  approved: boolean
  created_at: string
  updated_at: string
}
