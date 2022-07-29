import { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import { Filter } from 'types/categories'
import { ResourceType } from 'types/resources'

interface ResourceProviderProps {
  children: ReactNode
}

interface ResourceContextData {
  resource: ResourceType | null
  setResource: (resource: ResourceType | null) => void
  activeFilter: Filter | null
  setActiveFilter: (activeResource: Filter | null) => void
}

const ResourceContext = createContext<ResourceContextData>(
  {} as ResourceContextData
)

export function ResourceProvider({ children }: ResourceProviderProps) {
  const [resource, setResource] = useState<ResourceType | null>(null)
  const [activeFilter, setActiveFilter] = useState<Filter | null>(null)

  const ResourceContextProviderValues = {
    resource,
    setResource,
    activeFilter,
    setActiveFilter
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
