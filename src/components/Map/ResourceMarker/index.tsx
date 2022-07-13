import { Marker } from '@react-google-maps/api'
import { useMap } from 'contexts/mapContext'
import { MarkerLabel } from 'types/googleMaps'
import { ResourceType } from 'types/resources'
import { markerIcons } from 'utils/markerIcons'
import styles from './styles.module.scss'

interface ResourceMarkerProps {
  resource: ResourceType
  setResourceOpened: (opened: boolean) => void
  setResource: (resource: ResourceType) => void
}

export function ResourceMarker({
  resource,
  setResourceOpened,
  setResource
}: ResourceMarkerProps) {
  const { zoom } = useMap()

  const {
    id,
    name,
    category,
    position: { latitude: lat, longitude: lng }
  } = resource

  const markerLabel = (): MarkerLabel | null => {
    if (zoom > 15) {
      return {
        text: name,
        fontFamily: 'Roboto',
        color: '#66d9e8',
        fontSize: '16px',
        fontWeight: 'bold',
        className: styles.markerLabel
      }
    }

    return null
  }

  const handleMarkerClick = () => {
    setResourceOpened(true)
    setResource(resource)
  }

  return (
    <Marker
      onClick={handleMarkerClick}
      key={id}
      position={{ lat, lng }}
      icon={{
        url: markerIcons[category],
        scaledSize: new window.google.maps.Size(35, 35)
      }}
      title={name}
      label={markerLabel() ?? undefined}
    />
  )
}
