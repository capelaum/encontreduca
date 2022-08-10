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

  return data
}

export async function getResource(id: number): Promise<ResourceType> {
  const { data } = await api.get(`resources/${id}`)

  if (!data) {
    throw new Error('No resource data returned from API')
  }

  return data
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
