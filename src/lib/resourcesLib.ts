import { api } from 'services/api'
import {
  NewResourceVote,
  ResourceChange,
  ResourceType,
  ResourceVote,
  UpdatedResourceVote
} from 'types/resources'
import { Review } from 'types/reviews'

export async function loadResources(): Promise<ResourceType[]> {
  const { data } = await api.get('resources')

  if (!data) {
    throw new Error('No resources data returned from API')
  }

  const resources = data.map((resource: ResourceType) => ({
    ...resource,
    position: {
      lat: parseFloat(resource.latitude),
      lng: parseFloat(resource.longitude)
    }
  }))

  return resources
}

export async function getResource(id: number): Promise<ResourceType> {
  const { data } = await api.get(`resources/${id}`)

  if (!data) {
    throw new Error('No resource data returned from API')
  }

  return data
}

export async function createResource(
  newResource: FormData
): Promise<ResourceType> {
  const response = await api.post('/resources', newResource, {
    headers: {
      withCredentials: true,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      'X-Requested-With': 'XMLHttpRequest'
    }
  })

  if (response.status !== 201) {
    throw new Error('An error occurred while creating the resource')
  }

  const { data } = response

  return data
}

export async function getResourceVotes(id: number): Promise<ResourceVote[]> {
  const { data } = await api.get(`resources/${id}/votes`)

  if (!data) {
    throw new Error('No resource votes returned from API')
  }

  return data
}

export async function getResourceReviews(id: number): Promise<Review[]> {
  const { data } = await api.get(`resources/${id}/reviews`)

  if (!data) {
    throw new Error('No resource reviews returned from API')
  }

  return data
}

export async function createResourceChange(
  resourceChange: FormData
): Promise<ResourceChange> {
  const response = await api.post('resources/changes', resourceChange, {
    headers: {
      withCredentials: true,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      'X-Requested-With': 'XMLHttpRequest'
    }
  })

  if (response.status !== 201) {
    throw new Error('An error occurred while creating the resource changes')
  }

  const { data } = response

  return data
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
