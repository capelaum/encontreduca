import { UseFormReturnType } from '@mantine/form'
import { useQuery } from '@tanstack/react-query'
import {
  createResourceChange,
  getResourceReviews,
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
  setResourceReviews: (resourceReviews: Review[]) => void
  filteredResources: ResourceType[]
  resourceReviewsAverageRating: number
  resourceReviewsQuantity: number
  notApprovedResources: ResourceType[]
  userResourceReview: Review | null
  reviewsWithoutUser: Review[]
  userResourceVote: ResourceVote | null
  isFetchingResourceData: boolean
  getResourceDiff: (
    form: UseFormReturnType<ResourceFormValues>,
    cover: File | null
  ) => Partial<ResourceFormValues>
  createResourceChanges: (
    resourceDiff: Partial<ResourceFormValues>,
    coverFile: File | null
  ) => Promise<ResourceChange[]>
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

  useEffect(() => {
    if (resource) {
      ;(async () => {
        setIsFetchingResourceData(true)
        await refetchResourceReviews()
        setIsFetchingResourceData(false)
      })()
    }
  }, [resource])

  useEffect(() => {
    if (resourceReviewsData) {
      setResourceReviews(resourceReviewsData)
    }
  }, [resourceReviewsData])

  const orderByDateDesc = (data: ResourceType[] | Review[]) =>
    data.sort((a, b) => {
      const newA = a.updatedAt.split('/').reverse().join('-')
      const newB = b.updatedAt.split('/').reverse().join('-')
      return +new Date(newB) - +new Date(newA)
    })

  const filterResources = (): ResourceType[] => {
    if (!resources) return []

    const filteredResources = resources.filter(
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
    const average =
      reviews.reduce((acc, { rating }) => acc + rating, 0) / reviews.length

    return average
  }

  const getUserResourceReview = (reviews: Review[]) => {
    const userReview = reviews.find(({ userId }) => userId === user?.id)

    return userReview ?? null
  }

  const getReviewsWithoutUser = (reviews: Review[]) => {
    const reviewsWithoutUser = reviews.filter(
      ({ userId }) => userId !== user?.id
    )

    return reviewsWithoutUser
  }

  const getUseResourceVote = (votes: ResourceVote[]) => {
    const userVote = votes.find(
      ({ userId, resourceId }) =>
        userId === user?.id && resourceId === resource?.id
    )

    return userVote ?? null
  }

  const filteredResources = filterResources()

  const notApprovedResources = orderByDateDesc(
    filteredResources
  ) as ResourceType[]

  const userResourceReview = getUserResourceReview(resourceReviews)

  const reviewsWithoutUser = orderByDateDesc(
    getReviewsWithoutUser(resourceReviews)
  ) as Review[]

  const resourceReviewsAverageRating = getAverageRating(resourceReviews)

  const resourceReviewsQuantity = resourceReviews.length

  const userResourceVote = getUseResourceVote(user?.votes ?? [])

  const formatPositionAsString = (position: LatLngLiteral) =>
    `${position.lat},${position.lng}`

  const getResourceValue = (value: any) => {
    if (!value) return null

    return value.toString()
  }

  const getResourceDiff = (
    form: UseFormReturnType<ResourceFormValues>,
    coverFile: File | null
  ) => {
    const { values } = form

    const resourceDiff = Object.keys(values).reduce((acc, key) => {
      if (key === 'cover') {
        if (coverFile) {
          acc.cover = 'newCover'
        }
        return acc
      }

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

      const resourceFormKey = key as keyof ResourceFormValues
      const resourceTypeKey = key as keyof ResourceType

      const resourceValue = getResourceValue(resource![resourceTypeKey])
      const resourceFormValue = getResourceValue(values[resourceFormKey])

      if (resourceFormValue !== resourceValue) {
        ;(acc[resourceFormKey] as any) = resourceFormValue
      }

      return acc
    }, {} as Partial<ResourceFormValues>)

    return resourceDiff
  }

  const createResourceChanges = (
    resourceDiff: Partial<ResourceFormValues>,
    coverFile: File | null
  ) => {
    const resourceChanges = Object.keys(resourceDiff).map(async (key) => {
      const formData = new FormData()
      const resourceFormKey = key as keyof ResourceFormValues
      const resourceTypeKey = key as keyof ResourceType

      const oldValue = getResourceValue(resource![resourceTypeKey]) ?? 'nulo'
      const newValue = getResourceValue(resourceDiff[resourceFormKey]) ?? 'nulo'

      if (key === 'cover') formData.append('cover', coverFile!)

      formData.append('resourceId', resource!.id.toString())
      formData.append('field', key)
      formData.append(
        'oldValue',
        key === 'position'
          ? formatPositionAsString(resource!.position)
          : oldValue
      )
      formData.append('newValue', newValue)

      const resourceChange = await createResourceChange(formData)

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
    setResourceReviews,
    resourceReviewsAverageRating,
    resourceReviewsQuantity,
    filteredResources,
    notApprovedResources,
    userResourceReview,
    reviewsWithoutUser,
    userResourceVote,
    isFetchingResourceData,
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
