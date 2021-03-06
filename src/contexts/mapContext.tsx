/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { useModals } from '@mantine/modals'
import { useModalStyles } from 'components/Shared/styles/modalStyles'
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
}

const MapContext = createContext<MapContextData>({} as MapContextData)

export function MapProvider({ children }: MapProviderProps) {
  const [zoom, setZoom] = useState(14)
  const [center, setCenter] = useState<LatLngLiteral>(defaultCenter)
  const [directions, setDirections] = useState<DirectionsResult | null>(null)
  const [clickedPos, setClickedPos] = useState<LatLngLiteral | null>(null)
  const [place, setPlace] = useState<string | null>(null)
  const [currentLocation, setCurrentLocation] =
    useState<LatLngLiteral>(defaultCenter)
  const [currentCenter, setCurrentCenter] =
    useState<LatLngLiteral>(defaultCenter)

  const { openConfirmModal, closeModal } = useModals()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { classes } = useModalStyles(dark)

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

    getUserLocation()

    // openModalConfirm({
    //   title: 'Permite acessar sua localiza????o?',
    //   description: 'Para saber o seu local atual, precisamos de sua permiss??o.',
    //   onConfirm: getUserLocation,
    //   openConfirmModal,
    //   closeModal,
    //   classes,
    //   theme,
    //   dark
    // })
  }, [])

  const onUnmount = useCallback(() => {
    mapRef.current = undefined
  }, [])

  const moveToLocation = useCallback((position: LatLngLiteral) => {
    if (!mapRef.current) return

    mapRef.current.panTo({ lat: position.lat, lng: position.lng })
    mapRef.current.setZoom(17)
  }, [])

  const mapContextProviderValues = {
    center,
    currentCenter,
    zoom,
    place,
    currentLocation,
    clickedPos,
    directions,
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
    setDirections
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
