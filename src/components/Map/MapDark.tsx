import { Box } from '@mantine/core'
import { GoogleMap, Marker, MarkerClusterer } from '@react-google-maps/api'
import {
  ClustererOtions,
  mapContainerStyle,
  mapOptions
} from 'config/mapOptions'
import { useMap } from 'contexts/mapContext'
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
    onTilesLoaded,
    visibleResources,
    isCurrentLocationAllowed
  } = useMap()

  function renderResourcesMarkers(clusterer: MarkerClusterer | undefined) {
    return visibleResources.map((resource) => (
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
        options={mapOptions}
        onIdle={onIdle}
        onLoad={onMapLoad}
        onTilesLoaded={onTilesLoaded}
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

        <MarkerClusterer
          averageCenter
          maxZoom={14}
          options={ClustererOtions}
          minimumClusterSize={3}
        >
          {(clusterer) => <>{renderResourcesMarkers(clusterer as any)}</>}
        </MarkerClusterer>
      </GoogleMap>

      <SideButtons />
    </Box>
  )
}
