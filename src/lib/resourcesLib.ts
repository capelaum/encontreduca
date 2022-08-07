import { api } from 'services/api'
import {
  NewResource,
  ResourceChange,
  ResourceType,
  ResourceVote
} from 'types/resources'
import { Review } from 'types/reviews'
import { dateFormatter } from 'utils/dataFormatter'

export async function loadResources(): Promise<ResourceType[]> {
  const { data } = await api.get('resources')

  if (!data) {
    throw new Error('No resources data returned from API')
  }

  const resources = data.map((resource: ResourceType) => ({
    ...resource,
    category_id: resource.category_id.toString(),
    website: resource.website ?? '',
    phone: resource.phone ?? '',
    latitude: parseFloat(resource.latitude.toString()),
    longitude: parseFloat(resource.longitude.toString()),
    position: {
      lat: parseFloat(resource.latitude.toString()),
      lng: parseFloat(resource.longitude.toString())
    },
    created_at: dateFormatter(resource.created_at),
    updated_at: dateFormatter(resource.updated_at),
    reviews: resource.reviews.map((review: Review) => ({
      ...review,
      created_at: dateFormatter(review.created_at),
      updated_at: dateFormatter(review.updated_at)
    })),
    votes: resource.votes.map((vote: ResourceVote) => ({
      ...vote,
      created_at: dateFormatter(vote.created_at),
      updated_at: dateFormatter(vote.updated_at)
    }))
  }))

  return resources
}

export async function getResource(id: number): Promise<ResourceType> {
  const { data } = await api.get(`resources/${id}`)

  if (!data) {
    throw new Error('No resource data returned from API')
  }

  const resource = {
    ...data,
    position: {
      lat: parseFloat(data.latitude),
      lng: parseFloat(data.longitude)
    },
    created_at: dateFormatter(data.created_at),
    updated_at: dateFormatter(data.updated_at)
  }

  return resource
}

export async function createResource(
  newResource: NewResource
): Promise<ResourceType> {
  const response = await api.post('/resources', newResource)

  return response.data
}

export async function createResourceChange(
  updatedResource: ResourceChange
): Promise<ResourceChange> {
  const response = await api.post('resources/changes', updatedResource)

  return response.data
}

export async function createResourceVote(
  resourceVote: ResourceVote
): Promise<ResourceVote> {
  const response = await api.post('resources/votes', resourceVote)

  return response.data
}
