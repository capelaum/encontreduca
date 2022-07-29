import { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import { CategoryFilter } from 'types/categories'
import { ResourceType } from 'types/resources'
import { Review } from 'types/reviews'

interface ResourceProviderProps {
  children: ReactNode
}

interface ResourceContextData {
  resource: ResourceType | null
  setResource: (resource: ResourceType | null) => void
  activeFilter: CategoryFilter | null
  setActiveFilter: (activeResource: CategoryFilter | null) => void
  filterResources: (resources: ResourceType[]) => ResourceType[]
  getAverageRating: (reviews: Review[]) => number
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

  const getAverageRating = (reviews: Review[]) => {
    if (reviews.length === 0) return 0

    const average =
      reviews.reduce((acc, { rating }) => acc + rating, 0) / reviews.length

    return average
  }

  const ResourceContextProviderValues = {
    resource,
    setResource,
    activeFilter,
    setActiveFilter,
    getAverageRating,
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
