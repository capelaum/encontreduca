import { useMantineTheme } from '@mantine/core'
import { Marker } from '@react-google-maps/api'
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
}

export function ResourceMarker({
  resource,
  localPosition,
  clickable = true
}: ResourceMarkerProps) {
  const { zoom } = useMap()
  const { setResource } = useResource()
  const { setResourceOpened, setMenuOpened, setAuthSidebarOpened } =
    useSidebar()

  const theme = useMantineTheme()

  const { name, categoryName, position, approved } = resource

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

  return (
    <Marker
      clickable={clickable}
      onClick={handleMarkerClick}
      position={localPosition ?? position}
      icon={{
        url: approved
          ? categorySwitch[categoryName].markerIcon
          : '/markers/marker_unapproved.png'
        // scaledSize: new window.google.maps.Size(20, 28)
      }}
      title={name}
      label={markerLabel() ?? undefined}
    />
  )
}
