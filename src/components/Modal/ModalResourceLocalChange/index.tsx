import { Box, Button, Group, Image, Loader, Stack, Text } from '@mantine/core'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { Buttons } from 'components/Shared/Buttons'
import { defaultCenter, mapOptions } from 'config/options'
import { useSidebar } from 'contexts/sidebarContext'
import { useCallback, useRef, useState } from 'react'
import { MdMyLocation } from 'react-icons/md'
import { GoogleMapsMap, LatLngLiteral } from 'types/googleMaps'
import { categorySwitch } from 'utils/categorySwitch'
import { CloseButton } from '../Shared/CloseButton'

interface ModalResourceLocalChangeProps {
  onClose: () => void
}

export function ModalResourceLocalChange({
  onClose
}: ModalResourceLocalChangeProps) {
  const [currentCenter, setCurrentCenter] =
    useState<LatLngLiteral>(defaultCenter)

  console.log('🚀 ~ currentCenter', currentCenter)

  const { resource } = useSidebar()

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places']
  })

  const mapRef = useRef<GoogleMapsMap>()

  const onIdle = useCallback(() => {
    setCurrentCenter(mapRef.current!.getCenter()!.toJSON())
  }, [])

  const onMapLoad = useCallback((map: GoogleMapsMap) => {
    mapRef.current = map
  }, [])

  const moveToLocation = useCallback((position: LatLngLiteral) => {
    if (!mapRef.current) return

    mapRef.current.panTo({ lat: position.lat, lng: position.lng })
    mapRef.current.setZoom(16)
  }, [])

  const mapContainerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '7px'
  }

  return (
    <Stack spacing="xs">
      <CloseButton onClick={onClose} />

      <Text mb={8}>Nome do recurso</Text>

      <Box
        sx={(theme) => ({
          position: 'relative',
          width: '100%',
          height: '380px',
          borderRadius: theme.radius.md
        })}
      >
        {!isLoaded ? (
          <Loader />
        ) : (
          <GoogleMap
            onLoad={onMapLoad}
            onIdle={onIdle}
            clickableIcons={false}
            zoom={16}
            center={resource ? resource.position : defaultCenter}
            mapContainerStyle={mapContainerStyle}
            options={mapOptions}
          />
        )}

        <Image
          src={
            resource
              ? categorySwitch[resource.category].markerIcon
              : '/markers/marker.svg'
          }
          alt="Marcador"
          sx={{
            position: 'absolute',
            left: '50%',
            top: '45%',
            transform: 'translate(-50%,-50%)'
          }}
        />
      </Box>

      <Group align="center" position="apart">
        <Button
          mt="md"
          size="sm"
          radius="md"
          leftIcon={<MdMyLocation size={16} />}
          onClick={() =>
            moveToLocation(resource ? resource.position : defaultCenter)
          }
          sx={(theme) => ({
            backgroundColor: theme.colors.cyan[3],
            color: theme.colors.brand[7],
            '&:hover': {
              backgroundColor: theme.colors.cyan[4]
            }
          })}
        >
          Redefinir mapa
        </Button>
        <Buttons
          onCancel={onClose}
          onConfirm={onClose}
          onConfirmText="Salvar"
        />
      </Group>
    </Stack>
  )
}
