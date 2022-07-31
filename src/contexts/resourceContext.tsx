import { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import { CategoryFilter, CategoryType } from 'types/categories'
import { Motive } from 'types/motives'
import { ResourceType } from 'types/resources'
import { Review } from 'types/reviews'
import { User } from 'types/users'

interface ResourceProviderProps {
  children: ReactNode
}

interface ResourceContextData {
  user: User | null
  setUser: (user: User | null) => void
  categories: CategoryType[]
  setCategories: (categories: CategoryType[]) => void
  motives: Motive[]
  setMotives: (motives: Motive[]) => void
  resources: ResourceType[]
  setResources: (resources: ResourceType[]) => void
  resource: ResourceType | null
  setResource: (resource: ResourceType | null) => void
  activeFilter: CategoryFilter | null
  setActiveFilter: (activeResource: CategoryFilter | null) => void
  filterResources: (resources: ResourceType[]) => ResourceType[]
  getAverageRating: (reviews: Review[]) => number
  getUserResourceReview: (reviews: Review[]) => Review | null
  getReviewsWithoutUser: (reviews: Review[]) => Review[]
}

const ResourceContext = createContext<ResourceContextData>(
  {} as ResourceContextData
)

export function ResourceProvider({ children }: ResourceProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  const [resource, setResource] = useState<ResourceType | null>(null)
  const [resources, setResources] = useState<ResourceType[]>(
    [] as ResourceType[]
  )

  const [categories, setCategories] = useState<CategoryType[]>(
    [] as CategoryType[]
  )

  const [motives, setMotives] = useState<Motive[]>([] as Motive[])

  const [activeFilter, setActiveFilter] = useState<CategoryFilter | null>(null)

  const filterResources = (resourcesList: ResourceType[]) => {
    const filteredResources = resourcesList.filter(({ approved, category }) => {
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

  const getUserResourceReview = (reviews: Review[]) => {
    const userReview = reviews.find(({ user_id }) => user_id === user?.id)

    return userReview ?? null
  }

  const getReviewsWithoutUser = (reviews: Review[]) => {
    const reviewsWithoutUser = reviews.filter(
      ({ user_id }) => user_id !== user?.id
    )

    return reviewsWithoutUser
  }

  const ResourceContextProviderValues = {
    user,
    setUser,
    categories,
    setCategories,
    motives,
    setMotives,
    resources,
    setResources,
    resource,
    setResource,
    activeFilter,
    setActiveFilter,
    getAverageRating,
    filterResources,
    getUserResourceReview,
    getReviewsWithoutUser
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
