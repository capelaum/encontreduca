import { LatLngLiteral } from './googleMaps'

export type ResourceType = {
  id: string | number

  name: string
  address: string
  website: string | null
  phone: string | null
  cover: string
  position: LatLngLiteral
  approved: boolean
  latitude: string
  longitude: string

  userId: string | number
  author: string
  categoryId: string | number
  categoryName: string

  createdAt: string
  updatedAt: string
}

export type NewResourceComplaint = {
  resourceId: string | number
  motiveId: string | number
}

export type ResourceChange = {
  resourceId: string | number
  field: string
  oldValue: string
  newValue: string
}

export type ResourceVote = {
  id: string | number
  userId: string | number
  resourceId: string | number
  vote: boolean
  justification: string
}

export type NewResourceVote = Pick<
  ResourceVote,
  'resourceId' | 'vote' | 'justification'
>

export type UpdatedResourceVote = Pick<
  ResourceVote,
  'id' | 'vote' | 'justification'
>
