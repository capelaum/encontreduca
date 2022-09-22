import { useMantineTheme } from '@mantine/core'
import { Marker, MarkerClusterer } from '@react-google-maps/api'
import { useMap } from 'contexts/mapContext'
import { useResource } from 'contexts/resourceContext'
import { useSidebar } from 'contexts/sidebarContext'
import { LatLngLiteral, MarkerLabel } from 'types/googleMaps'
import { ResourceType } from 'types/resources'
import { categorySwitch } from 'utils/categorySwitch'
import styles from './styles.module.scss'

interface ResourceMarkerProps {
  resource: ResourceType
  localPosition?: LatLngLiteral
  clickable?: boolean
  clusterer?: MarkerClusterer | undefined
}

export function ResourceMarker({
  resource,
  localPosition,
  clickable = true,
  clusterer
}: ResourceMarkerProps) {
  const { zoom } = useMap()
  const { setResource, resource: selectedResource } = useResource()
  const { setResourceOpened, setMenuOpened, setAuthSidebarOpened } =
    useSidebar()

  const theme = useMantineTheme()

  const { name, categoryName, position, approved } = resource

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const markerLabel = (): MarkerLabel | null => {
    if (zoom > 15) {
      return {
        text: name,
        fontFamily: 'Roboto',
        color: theme.colors.cyan[3],
        fontSize: '14px',
        fontWeight: '500',
        className: styles.markerLabel
      }
    }

    return null
  }

  const handleMarkerClick = () => {
    if (clickable && setResourceOpened && setResource) {
      setResource(resource)
      setMenuOpened(false)
      setAuthSidebarOpened(false)
      setResourceOpened(true)
    }
  }

  const markerIcon = () => {
    if (selectedResource?.id === resource.id) {
      return '/markers/marker.svg'
    }

    if (approved) {
      return categorySwitch[categoryName].markerIcon
    }

    return '/markers/marker_unapproved.svg'
  }

  return (
    <Marker
      clickable={clickable}
      onClick={handleMarkerClick}
      position={localPosition ?? position}
      clusterer={(clusterer as any) ?? undefined}
      icon={{
        url: markerIcon(),
        scaledSize: new window.google.maps.Size(20, 28)
      }}
      title={name}
      // label={markerLabel() ?? undefined}
    />
  )
}
