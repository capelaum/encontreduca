import { Box } from '@mantine/core'
import { GoogleMap, Marker, MarkerClusterer } from '@react-google-maps/api'
import {
  ClustererOtions,
  mapContainerStyle,
  mapOptionsLight
} from 'config/mapOptions'
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
    isCurrentLocationAllowed
  } = useMap()

  const { filterResources } = useResource()
  const filteredResources = filterResources()

  function renderResourcesMarkers(clusterer: any) {
    return filteredResources.map((resource) => (
      <ResourceMarker
        key={`resourceMarker-${resource.id}`}
        resource={resource}
        clusterer={clusterer}
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
        mapContainerStyle={mapContainerStyle}
      >
        {isCurrentLocationAllowed && (
          <Marker
            position={currentLocation}
            icon={{
              url: '/markers/marker_current.png',
              scaledSize: new window.google.maps.Size(10, 10)
            }}
          />
        )}

        <MarkerClusterer averageCenter maxZoom={13} options={ClustererOtions}>
          {(clusterer) => <>{renderResourcesMarkers(clusterer)}</>}
        </MarkerClusterer>
      </GoogleMap>

      <SideButtons />
    </Box>
  )
}
