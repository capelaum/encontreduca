import { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import { CategoryFilter } from 'types/categories'
import { ResourceType } from 'types/resources'

interface ResourceProviderProps {
  children: ReactNode
}

interface ResourceContextData {
  resource: ResourceType | null
  setResource: (resource: ResourceType | null) => void
  activeFilter: CategoryFilter | null
  setActiveFilter: (activeResource: CategoryFilter | null) => void
  filterResources: (resources: ResourceType[]) => ResourceType[]
}

const ResourceContext = createContext<ResourceContextData>(
  {} as ResourceContextData
)

export function ResourceProvider({ children }: ResourceProviderProps) {
  const [resource, setResource] = useState<ResourceType | null>(null)
  const [activeFilter, setActiveFilter] = useState<CategoryFilter | null>(null)

  const filterResources = (resources: ResourceType[]) => {
    const filteredResources = resources.filter(({ approved, category }) => {
      if (approved && !activeFilter) {
        return true
      }

      if (
        approved &&
        activeFilter &&
        activeFilter.categoryNames.includes(category.name)
      ) {
        return true
      }

      return false
    })

    return filteredResources
  }

  const ResourceContextProviderValues = {
    resource,
    setResource,
    activeFilter,
    setActiveFilter,
    filterResources
  }

  const ResourceContextProviderValue = useMemo<ResourceContextData>(
    () => ({ ...ResourceContextProviderValues }),
    Object.values(ResourceContextProviderValues)
  )

  return (
    <ResourceContext.Provider value={ResourceContextProviderValue}>
      {children}
    </ResourceContext.Provider>
  )
}

export const useResource = (): ResourceContextData =>
  useContext(ResourceContext)
