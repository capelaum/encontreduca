import { Box, Group } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { mapContainerStyle, mapOptions } from 'config/options'
import { useMap } from 'contexts/mapContext'
import data from 'data/resources.json'
import { Filters } from './Filters'
import { ResourceMarker } from './ResourceMarker'
import { Search } from './Search'
import { SideButtons } from './SideButtons'

export default function Map(): JSX.Element {
  const largeScreen = useMediaQuery('(min-width: 768px)', false)

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

  const approvedResources = resources.filter(({ approved }) => approved)

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
      <Group
        direction={largeScreen ? 'row' : 'column'}
        spacing={largeScreen ? 'sm' : 'md'}
        align="center"
        noWrap
        sx={(theme) => ({
          position: 'absolute',
          top: theme.spacing.md,
          left: theme.spacing.md,
          right: largeScreen ? theme.spacing.xs : theme.spacing.md
        })}
      >
        <Search />

        <Filters />
      </Group>

      <GoogleMap
        zoom={zoom}
        center={center}
        options={mapOptions}
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
