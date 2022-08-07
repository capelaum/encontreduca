import { useMantineColorScheme } from '@mantine/core'
import { useModals } from '@mantine/modals'
import {
  modalStyles,
  useModalStyles
} from 'components/Shared/styles/modalStyles'
import { Title } from 'components/Shared/Title'
import { useResource } from 'contexts/resourceContext'
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa'
import { ActionButton } from '../ActionButton'

export function ResourceVote() {
  const { openContextModal } = useModals()

  const { resourceUserVote } = useResource()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { classes } = useModalStyles(dark)

  const openModalResourceVote = () =>
    openContextModal('vote', {
      title: (
        <Title
          name={resourceUserVote ? 'Edite seu voto' : 'Faça seu voto'}
          isModal
        />
      ),
      classNames: classes,
      ...modalStyles,
      innerProps: {
        onConfirmText: resourceUserVote ? 'Editar Voto' : 'Votar'
      }
    })

  return (
    <ActionButton
      text={resourceUserVote ? 'Votado' : 'Votar'}
      icon={
        resourceUserVote ? (
          <FaThumbsUp size={28} />
        ) : (
          <FaRegThumbsUp size={28} />
        )
      }
      onClick={openModalResourceVote}
    />
  )
}
