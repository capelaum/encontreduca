import { api } from 'services/api'
import { NewResource, ResourceType } from 'types/resources'
import { Review } from 'types/reviews'
import { dateFormatter } from 'utils/dataFormatter'

export async function loadResources(): Promise<ResourceType[]> {
  const { data } = await api.get('resources')

  if (!data) {
    throw new Error('No resources data returned from API')
  }

  const resources = data.map((resource: ResourceType) => ({
    ...resource,
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
