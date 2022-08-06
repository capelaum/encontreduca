import { UseFormReturnType } from '@mantine/form'
import { createResourceChange } from 'lib/resourcesLib'
import { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import { CategoryFilter, CategoryType } from 'types/categories'
import { Motive } from 'types/motives'
import {
  ResourceChange,
  ResourceFormValues,
  ResourceType
} from 'types/resources'
import { Review } from 'types/reviews'
import { User } from 'types/users'
import { useSidebar } from './sidebarContext'

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
  getResourceDiff: (
    form: UseFormReturnType<ResourceFormValues>
  ) => Partial<ResourceFormValues>
  createResourceChanges: (
    resourceDiff: Partial<ResourceFormValues>
  ) => Promise<ResourceChange[]>
}

const ResourceContext = createContext<ResourceContextData>(
  {} as ResourceContextData
)

export function ResourceProvider({ children }: ResourceProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [motives, setMotives] = useState<Motive[]>([] as Motive[])
  const [resource, setResource] = useState<ResourceType | null>(null)
  const [resources, setResources] = useState<ResourceType[]>([])
  const [activeFilter, setActiveFilter] = useState<CategoryFilter | null>(null)
  const { votingPanelOpened } = useSidebar()

  const filterResources = (resourcesList: ResourceType[]) => {
    const filteredResources = resourcesList.filter(({ approved, category }) => {
      if (!activeFilter) {
        if (votingPanelOpened) return !approved
        if (approved) return true
      }

      if (activeFilter && activeFilter.categoryNames.includes(category.name)) {
        if (votingPanelOpened) return !approved
        if (approved) return true
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

  const getResourceDiff = (form: UseFormReturnType<ResourceFormValues>) => {
    const { values } = form

    const resourceDiff = Object.keys(values).reduce((acc, key) => {
      const resourceFormValuesKey = key as keyof ResourceFormValues

      if (values[resourceFormValuesKey] !== resource![resourceFormValuesKey]) {
        ;(acc[resourceFormValuesKey] as any) = values[resourceFormValuesKey]
      }

      return acc
    }, {} as Partial<ResourceFormValues>)

    return resourceDiff
  }

  const createResourceChanges = async (
    resourceDiff: Partial<ResourceFormValues>
  ) => {
    const resourceChanges = Object.keys(resourceDiff).map(async (key) => {
      const resourceTypeKey = key as keyof ResourceFormValues

      const oldValue = resource![resourceTypeKey]
        ? resource![resourceTypeKey]!.toString()
        : 'nulo'

      const newValue = resourceDiff[resourceTypeKey]
        ? resourceDiff[resourceTypeKey]!.toString()
        : 'nulo'

      const resourceChange = await createResourceChange({
        resource_id: resource!.id,
        user_id: user!.id,
        field: key,
        old_value: oldValue,
        new_value: newValue
      })

      return resourceChange
    })

    return Promise.all(resourceChanges)
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
    getReviewsWithoutUser,
    getResourceDiff,
    createResourceChanges
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
