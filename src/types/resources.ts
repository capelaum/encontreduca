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

export type NewResource = Pick<
  ResourceType,
  | 'userId'
  | 'categoryId'
  | 'name'
  | 'address'
  | 'position'
  | 'phone'
  | 'website'
  | 'cover'
>

export type NewResourceComplaint = {
  userId: string | number
  resourceId: string | number
  motiveId: string | number
}

export type ResourceChange = {
  userId: string | number
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
  'userId' | 'resourceId' | 'vote' | 'justification'
>

export type UpdatedResourceVote = Pick<
  ResourceVote,
  'id' | 'vote' | 'justification'
>
