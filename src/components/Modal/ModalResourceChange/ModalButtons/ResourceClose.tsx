import { useModals } from '@mantine/modals'
import { Title } from 'components/Shared/Title'
import { useSidebar } from 'contexts/sidebarContext'
import data from 'data/motives.json'
import { MdCancel } from 'react-icons/md'
import { myTheme } from 'styles/theme'
import { getModalSelectDataMotives } from 'utils/modalSelecDataFormatter'
import { ModalResourceChangeButton } from '../ModalResourceChangeButton'

export function ResourceClose() {
  const { openContextModal } = useModals()
  const { resource } = useSidebar()

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
      padding: 'md',
      innerProps: {
        data: closeResourceMotives,
        resourceName: resource!.name
      }
    })

  return (
    <ModalResourceChangeButton
      icon={<MdCancel size={24} color={myTheme.colors!.brand![0]} />}
      label="Fechar ou remover"
      description="Marcar como fechado, inexistente ou duplicado"
      onClick={openModalResourceClose}
    />
  )
}
