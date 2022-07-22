import { useModals } from '@mantine/modals'
import { Title } from 'components/Shared/Title'
import { FaRegThumbsUp } from 'react-icons/fa'
import { ActionButton } from '../ActionButton'

export function ResourceVote() {
  const { openContextModal } = useModals()

  const openModalResourceVote = () =>
    openContextModal('vote', {
      title: <Title name="Faça seu voto" isModal />,
      radius: 'md',
      centered: true,
      withCloseButton: false,
      padding: 'md',
      innerProps: {
        onConfirmText: 'Enviar'
      }
    })

  return (
    <ActionButton
      text="Votar"
      icon={<FaRegThumbsUp size={28} />}
      onClick={openModalResourceVote}
    />
  )
}
