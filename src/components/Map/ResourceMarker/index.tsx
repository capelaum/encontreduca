import { Marker } from '@react-google-maps/api'
import { useMap } from 'contexts/mapContext'
import { useSidebar } from 'contexts/sidebarContext'
import { MarkerLabel } from 'types/googleMaps'
import { ResourceType } from 'types/resources'
import { categorySwitch } from 'utils/categorySwitch'
import styles from './styles.module.scss'

interface ResourceMarkerProps {
  resource: ResourceType
  clickable?: boolean
}

export function ResourceMarker({
  resource,
  clickable = true
}: ResourceMarkerProps) {
  const { zoom } = useMap()
  const { setResourceOpened, setResource, setMenuOpened } = useSidebar()

  const { name, category, position, approved } = resource

  const markerLabel = (): MarkerLabel | null => {
    if (zoom > 15) {
      return {
        text: name,
        fontFamily: 'Roboto',
        color: '#66d9e8',
        fontSize: '14px',
        fontWeight: '400',
        className: styles.markerLabel
      }
    }

    return null
  }

  const handleMarkerClick = () => {
    if (clickable && setResourceOpened && setResource) {
      setMenuOpened(false)
      setResourceOpened(true)
      setResource(resource)
    }
  }

  return (
    <Marker
      clickable={clickable}
      onClick={handleMarkerClick}
      position={position}
      icon={{
        url: approved
          ? categorySwitch[category.name].markerIcon
          : '/markers/marker_unapproved.svg',
        scaledSize: new window.google.maps.Size(35, 35)
      }}
      title={name}
      label={markerLabel() ?? undefined}
    />
  )
}
