import { Box } from '@mantine/core'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { mapContainerStyle } from 'config/options'
import { useMap } from 'contexts/mapContext'
import { SideButtons } from './SideButtons'

export default function Map(): JSX.Element {
  const {
    center,
    zoom,
    options,
    currentLocation,
    onIdle,
    onMapLoad,
    onUnmount,
    handleMapClick
  } = useMap()

  return (
    <Box sx={{ width: '100vw', height: '100vh', display: 'flex' }}>
      <GoogleMap
        zoom={zoom}
        center={center}
        options={options}
        onIdle={onIdle}
        onLoad={onMapLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
        mapContainerStyle={mapContainerStyle}
      >
        <Marker
          position={currentLocation}
          icon={{
            url: '/markers/marker_coworking.svg',
            scaledSize: new window.google.maps.Size(30, 30)
          }}
        />
      </GoogleMap>

      <SideButtons />
    </Box>
  )
}
