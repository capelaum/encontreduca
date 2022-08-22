import { defaultCenter } from 'config/mapOptions'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { GoogleMapsMap, LatLngLiteral } from 'types/googleMaps'
import { ResourceType } from 'types/resources'
import { useResource } from './resourceContext'
import { useSidebar } from './sidebarContext'

interface MapProviderProps {
  children: ReactNode
}

interface MapContextData {
  center: LatLngLiteral
  currentCenter: LatLngLiteral
  zoom: number
  currentLocation: LatLngLiteral
  isCurrentLocationAllowed: boolean
  setIsCurrentLocationAllowed: (isAllowed: boolean) => void
  onIdle: () => void
  onUnmount: () => void
  onMapLoad: (map: GoogleMapsMap) => void
  moveToLocation: (position: LatLngLiteral) => void
  setCenter: (position: LatLngLiteral) => void
  setZoom: (zoom: number) => void
  getUserLocation: () => void
  onTilesLoaded: () => void
  visibleResources: ResourceType[]
}

const MapContext = createContext<MapContextData>({} as MapContextData)

export function MapProvider({ children }: MapProviderProps) {
  const [zoom, setZoom] = useState(14)
  const [isCurrentLocationAllowed, setIsCurrentLocationAllowed] =
    useState(false)
  const [center, setCenter] = useState<LatLngLiteral>(defaultCenter)
  const [currentLocation, setCurrentLocation] =
    useState<LatLngLiteral>(defaultCenter)
  const [currentCenter, setCurrentCenter] =
    useState<LatLngLiteral>(defaultCenter)

  const [visibleResources, setVisibleResources] = useState<ResourceType[]>([])

  const mapRef = useRef<GoogleMapsMap>()

  const { resources, filterResources, activeFilter } = useResource()
  const { votingPanelOpened, savedResourcesOpened } = useSidebar()

  const onTilesLoaded = () => {
    const visibleMarkers = filterResources().filter((resource) =>
      mapRef.current?.getBounds()?.contains(resource.position)
    )

    setVisibleResources(visibleMarkers)
  }

  useEffect(() => {
    onTilesLoaded()
  }, [resources, votingPanelOpened, savedResourcesOpened, activeFilter])

  const onIdle = useCallback(() => {
    setZoom(mapRef.current!.getZoom()!)
    setCurrentCenter(mapRef.current!.getCenter()!.toJSON())
  }, [])

  const getUserLocation = useCallback(() => {
    navigator?.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        setCurrentLocation({ lat, lng })
        setCenter({ lat, lng })
      }
    )
  }, [])

  const onMapLoad = useCallback((map: GoogleMapsMap) => {
    mapRef.current = map
  }, [])

  const onUnmount = useCallback(() => {
    mapRef.current = undefined
  }, [])

  const moveToLocation = useCallback((position: LatLngLiteral) => {
    if (!mapRef.current) return

    mapRef.current.panTo({ lat: position.lat, lng: position.lng })
    mapRef.current.setZoom(16)
  }, [])

  const mapContextProviderValues = {
    center,
    currentCenter,
    zoom,
    currentLocation,
    isCurrentLocationAllowed,
    setIsCurrentLocationAllowed,
    onIdle,
    onMapLoad,
    onUnmount,
    moveToLocation,
    setCenter,
    setZoom,
    getUserLocation,
    onTilesLoaded,
    visibleResources
  }

  const mapContextProviderValue = useMemo<MapContextData>(
    () => ({ ...mapContextProviderValues }),
    Object.values(mapContextProviderValues)
  )

  return (
    <MapContext.Provider value={mapContextProviderValue}>
      {children}
    </MapContext.Provider>
  )
}

export const useMap = (): MapContextData => useContext(MapContext)
