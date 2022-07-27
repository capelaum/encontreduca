import { useMantineColorScheme } from '@mantine/core'
import { useModals } from '@mantine/modals'
import { Title } from 'components/Shared'
import {
  modalStyles,
  useModalStyles
} from 'components/Shared/styles/modalStyles'
import { FaRegThumbsUp } from 'react-icons/fa'
import { ActionButton } from '../ActionButton'

export function ResourceVote() {
  const { openContextModal } = useModals()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { classes } = useModalStyles(dark)

  const openModalResourceVote = () =>
    openContextModal('vote', {
      title: <Title name="Faça seu voto" isModal />,
      classNames: classes,
      ...modalStyles,
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
