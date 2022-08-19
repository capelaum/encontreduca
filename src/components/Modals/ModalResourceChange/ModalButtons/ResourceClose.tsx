import { useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { useModals } from '@mantine/modals'
import { useModalStyles } from 'components/Shared/styles/modalStyles'
import { Title } from 'components/Shared/Title'
import { useResource } from 'contexts/resourceContext'
import { MdCancel } from 'react-icons/md'
import { getMotivesSelectData } from 'utils/modalSelecDataFormatter'
import { ModalResourceChangeButton } from '../ModalResourceChangeButton'

interface ResourceCloseProps {
  onClose: () => void
}

export function ResourceClose({ onClose }: ResourceCloseProps) {
  const { openContextModal } = useModals()
  const { resource, motives } = useResource()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { classes } = useModalStyles(dark)

  const ResourceComplaintMotives = getMotivesSelectData(
    motives,
    'resource_complaint'
  )

  const openModalResourceClose = () =>
    openContextModal('select', {
      title: <Title name="Fechar ou remover" />,
      radius: 'md',
      centered: true,
      withCloseButton: false,
      classNames: classes,
      padding: 'md',
      innerProps: {
        motives: ResourceComplaintMotives,
        resource
      }
    })

  return (
    <ModalResourceChangeButton
      icon={
        <MdCancel
          size={24}
          color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}
        />
      }
      label="Fechar ou remover recurso educacional"
      description="Marcar como fechado, inexistente ou duplicado"
      onClick={() => {
        onClose()
        openModalResourceClose()
      }}
    />
  )
}
