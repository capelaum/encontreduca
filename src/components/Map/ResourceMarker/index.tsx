import { Marker } from '@react-google-maps/api'
import { useResource } from 'contexts/resourceContext'
import { useSidebar } from 'contexts/sidebarContext'
import { LatLngLiteral } from 'types/googleMaps'
import { ResourceType } from 'types/resources'
import { categorySwitch } from 'utils/categorySwitch'

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
  // const { zoom } = useMap()
  const { setResource } = useResource()
  const { setResourceOpened, setMenuOpened, setAuthSidebarOpened } =
    useSidebar()

  const { name, categoryName, position, approved } = resource

  // const markerLabel = (): MarkerLabel | null => {
  //   if (zoom > 15) {
  //     return {
  //       text: name,
  //       fontFamily: 'Roboto',
  //       color: '#66d9e8',
  //       fontSize: '14px',
  //       fontWeight: '400',
  //       className: styles.markerLabel
  //     }
  //   }

  //   return null
  // }

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
          : '/markers/marker_unapproved.svg',
        scaledSize: new window.google.maps.Size(20, 30)
      }}
      title={name}
      // label={markerLabel() ?? undefined}
    />
  )
}
