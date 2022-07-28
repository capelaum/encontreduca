import { useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { useModals } from '@mantine/modals'
import { useModalStyles } from 'components/Shared/styles/modalStyles'
import { Title } from 'components/Shared/Title'
import { useSidebar } from 'contexts/sidebarContext'
import data from 'data/motives.json'
import { MdCancel } from 'react-icons/md'
import { getModalSelectDataMotives } from 'utils/modalSelecDataFormatter'
import { ModalResourceChangeButton } from '../ModalResourceChangeButton'

interface ResourceCloseProps {
  onClose: () => void
}

export function ResourceClose({ onClose }: ResourceCloseProps) {
  const { openContextModal } = useModals()
  const { resource } = useSidebar()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { classes } = useModalStyles(dark)

  const closeResourceMotives = getModalSelectDataMotives(
    data.motives,
    'resource'
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
        data: closeResourceMotives,
        resourceName: resource!.name
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
      label="Fechar ou remover"
      description="Marcar como fechado, inexistente ou duplicado"
      onClick={() => {
        onClose()
        openModalResourceClose()
      }}
    />
  )
}
