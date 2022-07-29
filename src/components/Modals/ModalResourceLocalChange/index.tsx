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
import { defaultCenter, mapOptions, mapOptionsLight } from 'config/options'
import { useResource } from 'contexts/resourceContext'
import { useCallback, useRef, useState } from 'react'
import { MdMyLocation, MdPlace } from 'react-icons/md'
import { GoogleMapsMap, LatLngLiteral, libraries } from 'types/googleMaps'
import { categorySwitch } from 'utils/categorySwitch'
import { DefaultCloseButton } from '../../Shared/DefaultCloseButton'

interface ModalResourceLocalChangeProps {
  onClose: () => void
}

export function ModalResourceLocalChange({
  onClose
}: ModalResourceLocalChangeProps) {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const [currentCenter, setCurrentCenter] =
    useState<LatLngLiteral>(defaultCenter)

  console.log('🚀 ~ currentCenter', currentCenter)

  const { resource } = useResource()

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries
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
            center={resource ? resource.position : defaultCenter}
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
            moveToLocation(resource ? resource.position : defaultCenter)
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
              title: 'Novo local salvo com sucesso!',
              description: 'Agradecemos sua participação!',
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
