import { useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { useModals } from '@mantine/modals'
import { Title } from 'components/Shared/Title'
import { useResource } from 'contexts/resourceContext'
import { MdCancel } from 'react-icons/md'
import { useModalStyles } from 'styles/modalStyles'
import { getMotivesSelectData } from 'utils/modalSelecDataFormatter'
import { ModalResourceChangeButton } from './ModalResourceChangeButton'

interface ResourceCloseProps {
  onClose: () => void
}

export function ResourceCloseButton({ onClose }: ResourceCloseProps) {
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
