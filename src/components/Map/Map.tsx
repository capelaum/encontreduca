import { Box, Text } from '@mantine/core'
import { GoogleMap, Marker, OverlayView } from '@react-google-maps/api'
import { mapContainerStyle } from 'config/options'
import { useMap } from 'contexts/mapContext'
import data from 'data/resources.json'
import { markerIcons } from 'utils/markerIcons'
import { SideButtons } from './SideButtons'

export default function Map(): JSX.Element {
  const { resources } = data

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

  const getPixelPositionOffset = (width: number, height: number) => ({
    x: 16,
    y: height / 2
  })

  /* const markerLabel = (name: string): MarkerLabel | null => {
    if (zoom > 14) {
      return {
        text: name,
        fontFamily: 'Roboto',
        color: '#66d9e8',
        fontSize: '16px',
        fontWeight: 'medium',
        className: 'marker-label'
      }
    }

    return null
  } */

  function renderResourcesMarkers() {
    return resources.map(({ id, name, category, position }) => {
      const { latitude: lat, longitude: lng } = position

      return (
        <>
          <Marker
            key={id}
            position={{ lat, lng }}
            icon={{
              url: markerIcons[category],
              scaledSize: new window.google.maps.Size(30, 30)
              // labelOrigin: {
              //   x: 60,
              //   y: -10
              // } as google.maps.Point
            }}
            title={name}
          />

          {zoom > 14 && (
            <OverlayView
              position={{ lat, lng }}
              mapPaneName={OverlayView.MAP_PANE}
              getPixelPositionOffset={() => getPixelPositionOffset(lat, lng)}
            >
              <Text sx={(theme) => ({ color: theme.colors.cyan[3] })}>
                {name}
              </Text>
            </OverlayView>
          )}
        </>
      )
    })
  }

  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
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
