import { api } from 'services/api'
import { ResourceType } from 'types/resources'

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
