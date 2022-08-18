import { UseFormReturnType } from '@mantine/form'
import { useQuery } from '@tanstack/react-query'
import {
  createResourceChange,
  getResourceReviews,
  getResourceVotes,
  loadResources
} from 'lib/resourcesLib'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { CategoryFilter, CategoryType } from 'types/categories'
import { ResourceFormValues } from 'types/forms'
import { LatLngLiteral } from 'types/googleMaps'
import { Motive } from 'types/motives'
import { ResourceChange, ResourceType, ResourceVote } from 'types/resources'
import { Review } from 'types/reviews'
import { useAuth } from './authContext'
import { useSidebar } from './sidebarContext'

interface ResourceProviderProps {
  children: ReactNode
}

interface ResourceContextData {
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
  filterResources: () => ResourceType[]
  getAverageRating: (reviews: Review[]) => number
  getUserResources: () => ResourceType[]
  getNotApprovedResources: () => ResourceType[]
  getResourceDiff: (
    form: UseFormReturnType<ResourceFormValues>
  ) => Partial<ResourceFormValues>
  createResourceChanges: (
    resourceDiff: Partial<ResourceFormValues>
  ) => Promise<ResourceChange[]>
  userResourceReview: Review | null
  reviewsWithoutUser: Review[]
  resourceUserVote: ResourceVote | null
  isFetchingResourceData: boolean
  getUserResourceReview: (reviews: Review[] | null) => Review | null
  getReviewsWithoutUser: (reviews: Review[] | null) => Review[]
}

const ResourceContext = createContext<ResourceContextData>(
  {} as ResourceContextData
)

export function ResourceProvider({ children }: ResourceProviderProps) {
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [motives, setMotives] = useState<Motive[]>([] as Motive[])
  const [resource, setResource] = useState<ResourceType | null>(null)
  const [activeFilter, setActiveFilter] = useState<CategoryFilter | null>(null)
  const [resourceReviews, setResourceReviews] = useState<Review[]>([])
  const [resourceVotes, setResourceVotes] = useState<ResourceVote[]>([])

  const [isFetchingResourceData, setIsFetchingResourceData] = useState(false)

  const { votingPanelOpened, savedResourcesOpened } = useSidebar()
  const { user } = useAuth()

  const {
    data: resources,
    error: resourcesError,
    status: resourcesStatus
  } = useQuery(['resources'], loadResources)

  const { data: resourceReviewsData, refetch: refetchResourceReviews } =
    useQuery(['reviews'], () => getResourceReviews(+resource!.id), {
      enabled: !!resource
    })

  const { data: resourceVotesData, refetch: refetchResourceVotes } = useQuery(
    ['votes'],
    () => getResourceVotes(+resource!.id),
    { enabled: !!resource }
  )

  const handleFetchResourceData = async () => {
    setIsFetchingResourceData(true)

    await refetchResourceReviews()
    await refetchResourceVotes()

    setIsFetchingResourceData(false)
  }

  useEffect(() => {
    if (resource) {
      handleFetchResourceData()
    }
  }, [resource])

  useEffect(() => {
    setResourceReviews(resourceReviewsData!)
    setResourceVotes(resourceVotesData!)
  }, [resourceReviewsData, resourceVotesData])

  const getUserResources = () =>
    resources!.filter(
      ({ id, approved }) => approved && user && user.resourcesIds.includes(+id)
    )

  const getNotApprovedResources = () =>
    resources!.filter(({ approved }) => !approved).sort((a, b) => +b.id - +a.id)

  const filterResources = () => {
    const filteredResources = resources!.filter(
      ({ approved, categoryName, id }) => {
        if (!activeFilter) {
          if (votingPanelOpened) return !approved
          if (savedResourcesOpened)
            return approved && user?.resourcesIds.includes(+id)
          if (approved) return true
        }

        if (activeFilter && activeFilter.categoryNames.includes(categoryName)) {
          if (votingPanelOpened) return !approved
          if (savedResourcesOpened)
            return approved && user?.resourcesIds.includes(+id)
          if (approved) return true
        }

        return false
      }
    )

    return filteredResources
  }

  const getAverageRating = (reviews: Review[]) => {
    if (!reviews) return 0
    if (reviews.length === 0) return 0

    const average =
      reviews.reduce((acc, { rating }) => acc + rating, 0) / reviews.length

    return average
  }

  const getUserResourceReview = (reviews: Review[] | null) => {
    if (!reviews) return null

    const userReview = reviews.find(({ userId }) => userId === user?.id)

    return userReview ?? null
  }

  const getReviewsWithoutUser = (reviews: Review[] | null) => {
    if (!reviews) return []

    const reviewsWithoutUser = reviews.filter(
      ({ userId }) => userId !== user?.id
    )

    return reviewsWithoutUser
  }

  const getUseResourceVote = (votes: ResourceVote[]) => {
    if (!votes) return null

    const userVote = votes.find(({ userId }) => userId === user?.id)

    return userVote ?? null
  }

  const userResourceReview = getUserResourceReview(resourceReviews)

  const reviewsWithoutUser = getReviewsWithoutUser(resourceReviews)

  const resourceUserVote = getUseResourceVote(resourceVotes)

  const formatPositionAsString = (position: LatLngLiteral) =>
    `${position.lat},${position.lng}`

  const getResourceValue = (value: any) => {
    if (!value) return null

    return value.toString()
  }

  const getResourceDiff = (form: UseFormReturnType<ResourceFormValues>) => {
    const { values } = form

    const resourceDiff = Object.keys(values).reduce((acc, key) => {
      const resourceFormKey = key as keyof ResourceFormValues
      const resourceTypeKey = key as keyof ResourceType

      if (key === 'position') {
        const resourcePositionAsString = formatPositionAsString(
          resource!.position
        )

        const resourceFormPositionAsString = formatPositionAsString(
          values.position
        )

        if (resourcePositionAsString !== resourceFormPositionAsString) {
          ;(acc.position as any) = resourceFormPositionAsString
        }

        return acc
      }

      const resourceValue = getResourceValue(resource![resourceTypeKey])
      const resourceFormValue = getResourceValue(values[resourceFormKey])

      if (resourceFormValue !== resourceValue) {
        ;(acc[resourceFormKey] as any) = resourceFormValue
      }

      return acc
    }, {} as Partial<ResourceFormValues>)

    return resourceDiff
  }

  const createResourceChanges = async (
    resourceDiff: Partial<ResourceFormValues>
  ) => {
    const resourceChanges = Object.keys(resourceDiff).map(async (key) => {
      const resourceFormKey = key as keyof ResourceFormValues
      const resourceTypeKey = key as keyof ResourceType

      const oldValue = getResourceValue(resource![resourceTypeKey]) ?? 'nulo'
      const newValue = getResourceValue(resourceDiff[resourceFormKey]) ?? 'nulo'

      const resourceChange = await createResourceChange({
        resourceId: resource!.id,
        userId: user!.id,
        field: key,
        oldValue:
          key === 'position'
            ? formatPositionAsString(resource!.position)
            : oldValue,
        newValue
      })

      return resourceChange
    })

    return Promise.all(resourceChanges)
  }

  const ResourceContextProviderValues = {
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
    getUserResources,
    getNotApprovedResources,
    getResourceDiff,
    createResourceChanges,
    userResourceReview,
    reviewsWithoutUser,
    resourceUserVote,
    isFetchingResourceData,
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
