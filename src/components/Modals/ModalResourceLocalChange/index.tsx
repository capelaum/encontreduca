import {
  Box,
  Button,
  Group,
  Image,
  Loader,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { ConfirmButtons } from 'components/Shared/ConfirmButtons'
import { buttonStyles } from 'components/Shared/styles/inputStyles'
import { showToast } from 'components/Shared/ToastMessage'
import { mapOptions, mapOptionsLight } from 'config/options'
import { useMap } from 'contexts/mapContext'
import { useResource } from 'contexts/resourceContext'
import { useCallback, useRef } from 'react'
import { MdMyLocation, MdPlace } from 'react-icons/md'
import { GoogleMapsMap, LatLngLiteral, libraries } from 'types/googleMaps'
import { categorySwitch } from 'utils/categorySwitch'
import { DefaultCloseButton } from '../../Shared/DefaultCloseButton'

interface ModalResourceLocalChangeProps {
  onClose: () => void
  setLocalPosition: (position: LatLngLiteral) => void
}

export function ModalResourceLocalChange({
  onClose,
  setLocalPosition
}: ModalResourceLocalChangeProps) {
  const { currentLocation } = useMap()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { resource } = useResource()

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries
  })

  const mapRef = useRef<GoogleMapsMap>()

  const onIdle = useCallback(() => {
    if (mapRef.current && mapRef.current.getCenter()) {
      setLocalPosition(mapRef.current.getCenter()!.toJSON())
    }
  }, [])

  const onMapLoad = useCallback((map: GoogleMapsMap) => {
    mapRef.current = map
  }, [])

  const moveToLocation = useCallback((position: LatLngLiteral) => {
    if (!mapRef.current) return

    mapRef.current.panTo({ lat: position.lat, lng: position.lng })
    mapRef.current.setZoom(14)
  }, [])

  const mapContainerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '7px'
  }

  return (
    <Stack spacing="xs">
      <DefaultCloseButton onClick={onClose} title="Fechar Modal" />

      <Text mb={8} color={dark ? theme.colors.gray[0] : theme.colors.gray[8]}>
        Nome do recurso
      </Text>

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '380px',
          borderRadius: theme.radius.md
        }}
      >
        {!isLoaded ? (
          <Loader />
        ) : (
          <GoogleMap
            onLoad={onMapLoad}
            onIdle={onIdle}
            clickableIcons={false}
            zoom={14}
            center={resource ? resource.position : currentLocation}
            mapContainerStyle={mapContainerStyle}
            options={dark ? mapOptions : mapOptionsLight}
          />
        )}

        <Image
          src={
            resource
              ? categorySwitch[resource.category.name].markerIcon
              : '/markers/marker.svg'
          }
          alt="Marcador"
          withPlaceholder
          placeholder={<Image src="/markers/marker.svg" />}
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
            moveToLocation(resource ? resource.position : currentLocation)
          }
          sx={buttonStyles(theme, dark)}
        >
          Redefinir mapa
        </Button>

        <ConfirmButtons
          onCancel={onClose}
          onConfirm={() => {
            onClose()
            showToast({
              title: 'Novo local salvo',
              description: 'Local foi atualizado com sucesso!',
              icon: <MdPlace size={24} color={theme.colors.brand[7]} />,
              dark
            })
          }}
          onConfirmText="Salvar"
        />
      </Group>
    </Stack>
  )
}
