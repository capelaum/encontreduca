import { useMantineColorScheme } from '@mantine/core'
import { useModals } from '@mantine/modals'
import {
  modalStyles,
  useModalStyles
} from 'components/Shared/styles/modalStyles'
import { Title } from 'components/Shared/Title'
import { useResource } from 'contexts/resourceContext'
import { FaRegThumbsUp, FaThumbsDown, FaThumbsUp } from 'react-icons/fa'
import { ActionButton } from './ActionButton'

export function ActionResourceVote() {
  const { openContextModal } = useModals()

  const { userResourceVote } = useResource()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { classes } = useModalStyles(dark)

  const openModalResourceVote = () =>
    openContextModal('vote', {
      title: (
        <Title
          name={userResourceVote ? 'Edite seu voto' : 'Faça seu voto'}
          isModal
        />
      ),
      classNames: classes,
      ...modalStyles,
      innerProps: {
        onConfirmText: userResourceVote ? 'Editar Voto' : 'Votar'
      }
    })

  const setVoteIcon = () => {
    if (userResourceVote && userResourceVote.vote)
      return <FaThumbsUp size={28} />

    if (userResourceVote && !userResourceVote.vote)
      return <FaThumbsDown size={28} />

    return <FaRegThumbsUp size={28} />
  }

  return (
    <ActionButton
      text={userResourceVote ? 'Votado' : 'Votar'}
      icon={setVoteIcon()}
      onClick={openModalResourceVote}
    />
  )
}
