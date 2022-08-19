import { Box } from '@mantine/core'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { mapContainerStyle, mapOptionsLight } from 'config/mapOptions'
import { useMap } from 'contexts/mapContext'
import { useResource } from 'contexts/resourceContext'
import { ResourceMarker } from './ResourceMarker'
import { Search } from './Search'
import { SideButtons } from './SideButtons'

export function MapLight() {
  const {
    center,
    zoom,
    currentLocation,
    onIdle,
    onMapLoad,
    onUnmount,
    handleMapClick,
    isCurrentLocationAllowed
  } = useMap()

  const { filterResources } = useResource()
  const filteredResources = filterResources()

  function renderResourcesMarkers() {
    return filteredResources.map((resource) => (
      <ResourceMarker
        key={`resourceMarker-${resource.id}`}
        resource={resource}
      />
    ))
  }

  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <Search />

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
        {isCurrentLocationAllowed && (
          <Marker
            position={currentLocation}
            icon={{
              url: '/markers/marker_current.svg',
              scaledSize: new window.google.maps.Size(10, 10)
            }}
          />
        )}

        {renderResourcesMarkers()}
      </GoogleMap>

      <SideButtons />
    </Box>
  )
}
