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
import { DefaultCloseButton } from 'components/Shared/Default/DefaultCloseButton'
import { showToast } from 'components/Shared/ToastMessage'
import { mapOptions, mapOptionsLight } from 'config/mapOptions'
import { useCallback, useRef, useState } from 'react'
import { MdMyLocation, MdPlace } from 'react-icons/md'
import { buttonStyles } from 'styles/inputStyles'
import { GoogleMapsMap, LatLngLiteral, libraries } from 'types/googleMaps'

interface ModalResourceLocalChangeProps {
  onClose: () => void
  localPosition: LatLngLiteral
  setLocalPosition: (position: LatLngLiteral) => void
  markerIcon: string
}

export function ModalResourceLocalChange({
  onClose,
  localPosition,
  setLocalPosition,
  markerIcon
}: ModalResourceLocalChangeProps) {
  const [currentPosition, setCurrentPosition] = useState(localPosition)

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries
  })

  const mapRef = useRef<GoogleMapsMap>()

  const onIdle = useCallback(() => {
    if (mapRef.current && mapRef.current.getCenter()) {
      setCurrentPosition(mapRef.current.getCenter()!.toJSON())
    }
  }, [])

  const onMapLoad = useCallback((map: GoogleMapsMap) => {
    mapRef.current = map
  }, [])

  const moveToLocation = useCallback((position: LatLngLiteral) => {
    if (!mapRef.current) return

    mapRef.current.panTo({ lat: position.lat, lng: position.lng })
    // mapRef.current.setZoom(14)
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
            zoom={16}
            center={localPosition}
            mapContainerStyle={mapContainerStyle}
            options={dark ? mapOptions : mapOptionsLight}
          />
        )}

        <Image
          src={markerIcon}
          alt="Marcador"
          // withPlaceholder
          // placeholder={<Image src={markerIcon} />}
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
          onClick={() => moveToLocation(localPosition)}
          sx={buttonStyles(theme, dark)}
        >
          Redefinir mapa
        </Button>

        <ConfirmButtons
          onCancel={onClose}
          onConfirm={() => {
            setLocalPosition({
              lat: +currentPosition.lat.toFixed(7),
              lng: +currentPosition.lng.toFixed(7)
            })
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
