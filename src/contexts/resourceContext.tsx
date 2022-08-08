import { UseFormReturnType } from '@mantine/form'
import { useQuery } from '@tanstack/react-query'
import { createResourceChange, loadResources } from 'lib/resourcesLib'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { CategoryFilter, CategoryType } from 'types/categories'
import { Motive } from 'types/motives'
import {
  ResourceChange,
  ResourceFormValues,
  ResourceType,
  ResourceVote
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
  resources: ResourceType[] | undefined
  resourcesError: unknown
  resourcesStatus: 'loading' | 'error' | 'success'
  resource: ResourceType | null
  setResource: (resource: ResourceType | null) => void
  activeFilter: CategoryFilter | null
  setActiveFilter: (activeResource: CategoryFilter | null) => void
  resourceReviews: Review[]
  setResourceReviews: (resourceReviews: Review[]) => void
  resourceVotes: ResourceVote[]
  setResourceVotes: (resourceVotes: ResourceVote[]) => void
  filterResources: (resources: ResourceType[]) => ResourceType[]
  getAverageRating: (reviews: Review[]) => number
  getResourceDiff: (
    form: UseFormReturnType<ResourceFormValues>
  ) => Partial<ResourceFormValues>
  createResourceChanges: (
    resourceDiff: Partial<ResourceFormValues>
  ) => Promise<ResourceChange[]>
  userResourceReview: Review | null
  reviewsWithoutUser: Review[]
  resourceUserVote: ResourceVote | null
}

const ResourceContext = createContext<ResourceContextData>(
  {} as ResourceContextData
)

export function ResourceProvider({ children }: ResourceProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [motives, setMotives] = useState<Motive[]>([] as Motive[])
  const [resource, setResource] = useState<ResourceType | null>(null)
  const [activeFilter, setActiveFilter] = useState<CategoryFilter | null>(null)
  const [resourceReviews, setResourceReviews] = useState<Review[]>([])
  const [resourceVotes, setResourceVotes] = useState<ResourceVote[]>([])

  const { votingPanelOpened } = useSidebar()

  const {
    data: resources,
    error: resourcesError,
    status: resourcesStatus
  } = useQuery(['resources'], loadResources)

  useEffect(() => {
    if (resource) {
      const resourceReviewsData = resource.reviews
        .flat()
        .sort((a, b) => +b.id - +a.id)
        .filter(({ resource_id }) => resource.id === resource_id)

      setResourceReviews(resourceReviewsData)

      const resourceVotesData = resource.votes
        .flat()
        .filter(({ resource_id }) => resource.id === resource_id)

      setResourceVotes(resourceVotesData)
    }
  }, [resource])

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

  useEffect(() => {}, [activeFilter, votingPanelOpened])

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

  const getUseResourceVote = (votes: ResourceVote[]) => {
    const userVote = votes.find(({ user_id }) => user_id === user?.id)

    return userVote ?? null
  }

  const userResourceReview = getUserResourceReview(resourceReviews)

  const reviewsWithoutUser = getReviewsWithoutUser(resourceReviews)

  const resourceUserVote = getUseResourceVote(resourceVotes)

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
    resourcesError,
    resourcesStatus,
    resource,
    setResource,
    activeFilter,
    setActiveFilter,
    resourceReviews,
    setResourceReviews,
    resourceVotes,
    setResourceVotes,
    getAverageRating,
    filterResources,
    getResourceDiff,
    createResourceChanges,
    userResourceReview,
    reviewsWithoutUser,
    resourceUserVote
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
