import { useMantineColorScheme } from '@mantine/core'
import { useModals } from '@mantine/modals'
import { ModalResourceChange } from 'components/Modals'
import { Title } from 'components/Shared/Title'
import { MdOutlineEdit } from 'react-icons/md'
import { modalStyles, useModalStyles } from 'styles/modalStyles'
import { ActionButton } from './ActionButton'

export function ActionResourceChange() {
  const { openModal, closeModal } = useModals()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { classes } = useModalStyles(dark)

  const openResourceChangeModal = () => {
    const id = openModal({
      title: <Title name="Sugerir uma alteração" padding={20} isModal />,
      ...modalStyles,
      classNames: classes,
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
