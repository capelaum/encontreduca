import { Box } from '@mantine/core'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { mapContainerStyle, mapOptionsLight } from 'config/options'
import { useMap } from 'contexts/mapContext'
import { useResource } from 'contexts/resourceContext'
import { CategoryType } from 'types/categories'
import { ResourceType } from 'types/resources'
import { ResourceMarker } from './ResourceMarker'
import { Search } from './Search'
import { SideButtons } from './SideButtons'

interface MapLightProps {
  resources: ResourceType[]
  categories: CategoryType[]
}

export function MapLight({ resources, categories }: MapLightProps) {
  const {
    center,
    zoom,
    currentLocation,
    onIdle,
    onMapLoad,
    onUnmount,
    handleMapClick
  } = useMap()

  const { filterResources } = useResource()
  const approvedResources = filterResources(resources)

  function renderResourcesMarkers() {
    return approvedResources.map((resource) => (
      <ResourceMarker
        key={`resourceMarker-${resource.id}`}
        resource={resource}
      />
    ))
  }

  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <Search categories={categories} />

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
