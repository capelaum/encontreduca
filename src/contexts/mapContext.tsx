import { defaultCenter } from 'config/options'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState
} from 'react'
import {
  DirectionsResult,
  GoogleMapsMap,
  LatLngLiteral,
  MapMouseEvent
} from 'types/googleMaps'

interface MapProviderProps {
  children: ReactNode
}

interface MapContextData {
  center: LatLngLiteral
  currentCenter: LatLngLiteral
  zoom: number
  place: string | null
  currentLocation: LatLngLiteral
  clickedPos: LatLngLiteral | null
  directions: DirectionsResult | null
  isCurrentLocationAllowed: boolean
  setIsCurrentLocationAllowed: (isAllowed: boolean) => void
  onIdle: () => void
  onUnmount: () => void
  clearLocation: () => void
  onMapLoad: (map: GoogleMapsMap) => void
  handleMapClick: (e: MapMouseEvent) => void
  moveToLocation: (position: LatLngLiteral) => void
  setDirections: (directions: DirectionsResult | null) => void
  setClickedPos: (position: LatLngLiteral | null) => void
  setPlace: (place: string | null) => void
  setCenter: (position: LatLngLiteral) => void
  setZoom: (zoom: number) => void
  getUserLocation: () => void
}

const MapContext = createContext<MapContextData>({} as MapContextData)

export function MapProvider({ children }: MapProviderProps) {
  const [zoom, setZoom] = useState(14)
  const [isCurrentLocationAllowed, setIsCurrentLocationAllowed] =
    useState(false)
  const [center, setCenter] = useState<LatLngLiteral>(defaultCenter)
  const [directions, setDirections] = useState<DirectionsResult | null>(null)
  const [clickedPos, setClickedPos] = useState<LatLngLiteral | null>(null)
  const [place, setPlace] = useState<string | null>(null)
  const [currentLocation, setCurrentLocation] =
    useState<LatLngLiteral>(defaultCenter)
  const [currentCenter, setCurrentCenter] =
    useState<LatLngLiteral>(defaultCenter)

  const mapRef = useRef<GoogleMapsMap>()

  const handleMapClick = ({ latLng }: MapMouseEvent) => {
    const mapClicklickedPos = { lat: latLng!.lat(), lng: latLng!.lng() }

    setClickedPos(clickedPos)
    setCenter(mapClicklickedPos)
    setDirections(null)
    setPlace(null)
  }

  const clearLocation = useCallback(() => {
    setClickedPos(null)
    setDirections(null)
    setPlace(null)
  }, [])

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
  }, [])

  const mapContextProviderValues = {
    center,
    currentCenter,
    zoom,
    place,
    currentLocation,
    clickedPos,
    directions,
    isCurrentLocationAllowed,
    setIsCurrentLocationAllowed,
    onIdle,
    onMapLoad,
    onUnmount,
    moveToLocation,
    handleMapClick,
    clearLocation,
    setClickedPos,
    setPlace,
    setCenter,
    setZoom,
    setDirections,
    getUserLocation
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
