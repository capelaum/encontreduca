import { Marker } from '@react-google-maps/api'
import { useMap } from 'contexts/mapContext'
import { MarkerLabel } from 'types/googleMaps'
import { Resource } from 'types/resources'
import { markerIcons } from 'utils/markerIcons'
import styles from './styles.module.scss'

interface ResourceMarkerProps {
  resource: Resource
  setResourceOpened: (opened: boolean) => void
}

export function ResourceMarker({
  resource,
  setResourceOpened
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

  return (
    <Marker
      onClick={() => setResourceOpened(true)}
      key={id}
      position={{ lat, lng }}
      icon={{
        url: markerIcons[category],
        scaledSize: new window.google.maps.Size(30, 30)
      }}
      title={name}
      label={markerLabel() ?? undefined}
    />
  )
}
