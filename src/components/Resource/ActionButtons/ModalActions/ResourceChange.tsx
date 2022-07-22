import { useModals } from '@mantine/modals'
import { ModalResourceChange } from 'components/Modal/ModalResourceChange'
import { Title } from 'components/Shared/Title'
import { MdOutlineEdit } from 'react-icons/md'
import { ActionButton } from '../ActionButton'

export function ResourceChange() {
  const { openModal, closeModal } = useModals()

  const openResourceChangeModal = () => {
    const id = openModal({
      title: <Title name="Sugerir uma alteração" padding={20} isModal />,
      radius: 'md',
      centered: true,
      withCloseButton: false,
      padding: 0,
      children: <ModalResourceChange onClose={() => closeModal(id)} />
    })
  }

  return (
    <ActionButton
      text="Editar"
      icon={<MdOutlineEdit size={28} />}
      onClick={openResourceChangeModal}
    />
  )
}
