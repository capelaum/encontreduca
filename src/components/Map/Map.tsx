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
          visible
          icon={{
            url: '/currentMarker.png',
            scaledSize: new window.google.maps.Size(20, 20)
          }}
        />

        <Marker position={currentLocation} title="Posição atual" />
        <Marker position={center} title="Posição atual" />
      </GoogleMap>

      <SideButtons />
    </Box>
  )
}
