import { Box, Button, Loader } from '@mantine/core'
import { useModals } from '@mantine/modals'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { ModalResourceLocalChange } from 'components/Modal/ModalResourceLocalChange'
import { Title } from 'components/Shared/Title'
import { defaultCenter, mapOptionsForm } from 'config/options'
import { MdEditLocationAlt } from 'react-icons/md'

export function Local() {
  const { openModal, closeModal } = useModals()

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places']
  })

  const mapContainerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '7px'
  }

  const openModalResourceLocalChange = () => {
    const id = openModal({
      title: <Title name="Editar local" />,
      radius: 'md',
      centered: true,
      withCloseButton: false,
      padding: 'md',
      overflow: 'outside',
      children: <ModalResourceLocalChange onClose={() => closeModal(id)} />
    })
  }

  return (
    <Box
      my={12}
      onClick={openModalResourceLocalChange}
      sx={(theme) => ({
        width: '100%',
        height: '200px',
        borderRadius: theme.radius.md,
        position: 'relative',
        '&:hover div': {
          cursor: 'pointer'
        }
      })}
    >
      {!isLoaded ? (
        <Loader />
      ) : (
        <GoogleMap
          clickableIcons={false}
          zoom={14}
          center={defaultCenter}
          mapContainerStyle={mapContainerStyle}
          options={mapOptionsForm}
        >
          <Marker position={defaultCenter} clickable={false} />
        </GoogleMap>
      )}

      <Button
        radius="xl"
        variant="white"
        size="sm"
        leftIcon={<MdEditLocationAlt size={18} />}
        sx={(theme) => ({
          position: 'absolute',
          bottom: theme.spacing.md,
          left: theme.spacing.sm,
          color: theme.colors.brand[7],
          '&:hover': {
            backgroundColor: theme.colors.brand[0]
          }
        })}
      >
        Editar local do mapa
      </Button>
    </Box>
  )
}
