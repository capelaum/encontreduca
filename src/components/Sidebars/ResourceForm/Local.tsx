import {
  Box,
  Button,
  Loader,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useModals } from '@mantine/modals'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { ResourceMarker } from 'components/Map/ResourceMarker'
import { ModalResourceLocalChange } from 'components/Modals/ModalResourceLocalChange'
import {
  modalStyles,
  useModalStyles
} from 'components/Shared/styles/modalStyles'
import { Title } from 'components/Shared/Title'
import {
  defaultCenter,
  mapOptionsForm,
  mapOptionsFormLight
} from 'config/options'
import { useSidebar } from 'contexts/sidebarContext'
import { MdEditLocationAlt } from 'react-icons/md'
import { libraries } from 'types/googleMaps'

export function Local() {
  const { resource } = useSidebar()
  const { openModal, closeModal } = useModals()

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries
  })

  const mapContainerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '7px'
  }

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { classes } = useModalStyles(dark)

  const openModalResourceLocalChange = () => {
    const id = openModal({
      classNames: classes,
      ...modalStyles,
      overflow: 'outside',
      title: <Title name="Editar local" />,
      children: <ModalResourceLocalChange onClose={() => closeModal(id)} />
    })
  }

  function renderMapLocal() {
    if (!isLoaded) {
      return <Loader />
    }

    return (
      <GoogleMap
        clickableIcons={false}
        zoom={14}
        center={resource ? resource.position : defaultCenter}
        mapContainerStyle={mapContainerStyle}
        options={dark ? mapOptionsForm : mapOptionsFormLight}
      >
        {resource ? (
          <ResourceMarker resource={resource} clickable={false} />
        ) : (
          <Marker position={defaultCenter} clickable={false} />
        )}
      </GoogleMap>
    )
  }

  return (
    <Box
      my={12}
      onClick={openModalResourceLocalChange}
      sx={{
        width: '100%',
        height: '200px',
        borderRadius: theme.radius.md,
        position: 'relative',
        '&:hover div': {
          cursor: 'pointer'
        }
      }}
    >
      {renderMapLocal()}

      <Button
        radius="xl"
        variant="white"
        size="sm"
        leftIcon={<MdEditLocationAlt size={18} />}
        sx={{
          position: 'absolute',
          bottom: theme.spacing.sm,
          left: theme.spacing.sm,
          color: theme.colors.brand[7],
          '&:hover': {
            backgroundColor: theme.colors.brand[0]
          },
          boxShadow: dark ? 'none' : '0 1px 4px rgba(0, 0, 0, 0.3)'
        }}
      >
        Editar local do mapa
      </Button>
    </Box>
  )
}
