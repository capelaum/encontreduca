import { api } from 'services/api'
import {
  NewResource,
  NewResourceVote,
  ResourceChange,
  ResourceType,
  ResourceVote,
  UpdatedResourceVote
} from 'types/resources'

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
    }
  }))

  return resources
}

export async function getResource(id: number): Promise<ResourceType> {
  const { data } = await api.get(`resources/${id}`)

  if (!data) {
    throw new Error('No resource data returned from API')
  }

  const resource: ResourceType = {
    ...data,
    category_id: data.category_id.toString(),
    website: data.website ?? '',
    phone: data.phone ?? '',
    latitude: parseFloat(data.latitude.toString()),
    longitude: parseFloat(data.longitude.toString()),
    position: {
      lat: parseFloat(data.latitude),
      lng: parseFloat(data.longitude)
    }
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
  resourceVote: NewResourceVote
): Promise<ResourceVote> {
  const response = await api.post('resources/votes', resourceVote)

  return response.data
}

export async function updateResourceVote(
  resourceVote: UpdatedResourceVote
): Promise<ResourceVote> {
  const response = await api.put(
    `resources/votes/${resourceVote.id}`,
    resourceVote
  )

  return response.data
}
