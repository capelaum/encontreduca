import { Box } from '@mantine/core'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { mapContainerStyle, mapOptionsLight } from 'config/options'
import { useMap } from 'contexts/mapContext'
import data from 'data/resources.json'
import { ResourceType } from 'types/resources'
import { ResourceMarker } from './ResourceMarker'
import { SideButtons } from './SideButtons'

interface MapProps {
  setResourceOpened: (opened: boolean) => void
  setResource: (resource: ResourceType) => void
}

export default function MapLight({
  setResourceOpened,
  setResource
}: MapProps): JSX.Element {
  const { resources } = data

  const {
    center,
    zoom,
    currentLocation,
    onIdle,
    onMapLoad,
    onUnmount,
    handleMapClick
  } = useMap()

  function renderResourcesMarkers() {
    return resources.map((resource) => (
      <ResourceMarker
        key={resource.id}
        resource={resource}
        setResourceOpened={setResourceOpened}
        setResource={setResource}
      />
    ))
  }

  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <GoogleMap
        zoom={zoom}
        center={center}
        options={mapOptionsLight}
        onIdle={onIdle}
        onLoad={onMapLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
        mapContainerStyle={mapContainerStyle}
      >
        <Marker
          position={currentLocation}
          icon={{
            url: '/markers/marker_current.svg',
            scaledSize: new window.google.maps.Size(10, 10)
          }}
        />

        {renderResourcesMarkers()}
      </GoogleMap>

      <SideButtons />
    </Box>
  )
}
