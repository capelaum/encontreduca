import { Box } from '@mantine/core'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { mapContainerStyle, mapOptions } from 'config/mapOptions'
import { useMap } from 'contexts/mapContext'
import { useResource } from 'contexts/resourceContext'
import { ResourceMarker } from './ResourceMarker'
import { Search } from './Search'
import { SideButtons } from './SideButtons'

export default function MapDark() {
  const {
    center,
    zoom,
    currentLocation,
    onIdle,
    onMapLoad,
    onUnmount,
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
        options={mapOptions}
        onIdle={onIdle}
        onLoad={onMapLoad}
        onUnmount={onUnmount}
        mapContainerStyle={mapContainerStyle}
      >
        {isCurrentLocationAllowed && (
          <Marker
            position={currentLocation}
            clickable={false}
            icon={{
              url: '/markers/marker_current.png',
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
