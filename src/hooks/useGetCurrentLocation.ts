import { useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { useModals } from '@mantine/modals'
import { openModalConfirm } from 'components/Modals'
import { useMap } from 'contexts/mapContext'
import { useModalStyles } from 'styles/modalStyles'

export const useGetCurrentLocation = () => {
  const { getUserLocation, setIsCurrentLocationAllowed } = useMap()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { openConfirmModal, closeModal } = useModals()
  const { classes } = useModalStyles(dark)

  const handleGetCurrentLocation = () => {
    const isCurrentLocationAllowedSaved = localStorage.getItem(
      'encontreduca_current_location_allowed'
    )

    if (
      isCurrentLocationAllowedSaved &&
      isCurrentLocationAllowedSaved === 'true'
    ) {
      getUserLocation()
      setIsCurrentLocationAllowed(true)
    }

    if (
      !isCurrentLocationAllowedSaved ||
      isCurrentLocationAllowedSaved !== 'true'
    ) {
      openModalConfirm({
        title: 'Permite acessar sua localização?',
        description:
          'Precisamos de sua permissão para saber o seu local atual.',
        onConfirm: () => {
          getUserLocation()
          setIsCurrentLocationAllowed(true)
          localStorage.setItem('encontreduca_current_location_allowed', 'true')
        },
        onCancel: () => {
          setIsCurrentLocationAllowed(false)
        },
        openConfirmModal,
        closeModal,
        classes,
        theme,
        dark
      })
    }
  }

  return {
    handleGetCurrentLocation
  }
}
