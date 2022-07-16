import { Divider, Stack } from '@mantine/core'
import { useModals } from '@mantine/modals'
import { Title } from 'components/Shared/Title'
import { useSidebar } from 'contexts/sidebarContext'
import data from 'data/motives.json'
import { MdCancel, MdEdit } from 'react-icons/md'
import { myTheme } from 'styles/theme'
import { getModalSelectDataMotives } from 'utils/modalSelecDataFormatter'
import { CloseButton } from '../Shared/CloseButton'
import { ModalResourceChangeButton } from './ModalResourceChangeButton'

interface ModalResourceChangeProps {
  onClose: () => void
}

export function ModalResourceChange({ onClose }: ModalResourceChangeProps) {
  const { resource, setChangeResourceOpened } = useSidebar()
  const { openContextModal } = useModals()
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
    <Stack spacing={0} pb={20}>
      <CloseButton onClick={onClose} />

      <Divider size="xs" color={myTheme.colors!.brand![0]} variant="dotted" />

      <ModalResourceChangeButton
        icon={<MdEdit size={24} color={myTheme.colors!.brand![0]} />}
        label="Alterar o nome ou outros detalhes"
        description="Editar nome, loca, endereço, contato, etc."
        onClick={() => {
          setChangeResourceOpened(true)
          onClose()
        }}
      />

      <Divider size="xs" color={myTheme.colors!.brand![0]} variant="dotted" />

      <ModalResourceChangeButton
        icon={<MdCancel size={24} color={myTheme.colors!.brand![0]} />}
        label="Fechar ou remover"
        description="Marcar como fechado, inexistente ou duplicado"
        onClick={openModalResourceClose}
      />

      <Divider size="xs" color={myTheme.colors!.brand![0]} variant="dotted" />
    </Stack>
  )
}
