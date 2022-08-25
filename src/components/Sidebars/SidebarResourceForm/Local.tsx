import {
  Box,
  Button,
  Loader,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useModals } from '@mantine/modals'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { ModalResourceLocalChange } from 'components/Modals'
import { Title } from 'components/Shared/Title'
import { mapOptionsForm, mapOptionsFormLight } from 'config/mapOptions'
import { useResource } from 'contexts/resourceContext'
import { MdEditLocationAlt } from 'react-icons/md'
import { modalStyles, useModalStyles } from 'styles/modalStyles'
import { LatLngLiteral, libraries } from 'types/googleMaps'
import { categorySwitch } from 'utils/categorySwitch'
import { getCategoriesSelectData } from 'utils/modalSelecDataFormatter'

interface LocalProps {
  localPosition: LatLngLiteral
  setLocalPosition: (position: LatLngLiteral) => void
  categoryId: string
}

export function Local({
  localPosition,
  setLocalPosition,
  categoryId
}: LocalProps) {
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

  const { categories } = useResource()
  const resourceCategories = getCategoriesSelectData(categories)

  const resourceFormCategoryName = resourceCategories.find(
    (category) => category.value === categoryId
  )?.label

  const markerIcon = () => {
    if (resourceFormCategoryName) {
      return categorySwitch[resourceFormCategoryName].markerIcon
    }

    return '/markers/marker_unapproved.png'
  }

  const openModalResourceLocalChange = () => {
    const id = openModal({
      classNames: classes,
      ...modalStyles,
      overflow: 'outside',
      title: <Title name="Editar local" />,
      children: (
        <ModalResourceLocalChange
          onClose={() => closeModal(id)}
          setLocalPosition={setLocalPosition}
          localPosition={localPosition}
          markerIcon={markerIcon()}
        />
      )
    })
  }

  function renderMapLocal() {
    if (!isLoaded) {
      return <Loader />
    }

    return (
      <GoogleMap
        clickableIcons={false}
        zoom={16}
        center={localPosition}
        mapContainerStyle={mapContainerStyle}
        options={dark ? mapOptionsForm : mapOptionsFormLight}
      >
        <Marker
          clickable={false}
          position={localPosition}
          icon={{
            url: markerIcon()
            // scaledSize: new window.google.maps.Size(20, 28)
          }}
        />
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
        Editar local do recurso
      </Button>
    </Box>
  )
}
