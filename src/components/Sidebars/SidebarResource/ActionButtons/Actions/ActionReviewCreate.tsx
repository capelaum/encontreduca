import { useMantineColorScheme } from '@mantine/core'
import { useModals } from '@mantine/modals'
import { Title } from 'components/Shared/Title'
import { useResource } from 'contexts/resourceContext'
import { MdStarBorder } from 'react-icons/md'
import { modalStyles, useModalStyles } from 'styles/modalStyles'
import { ActionButton } from './ActionButton'

export function ActionReviewCreate() {
  const { openContextModal } = useModals()
  const { resource } = useResource()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { classes } = useModalStyles(dark)

  const openModalReviewCreate = () =>
    openContextModal('review', {
      title: <Title name={resource!.name} isModal />,
      ...modalStyles,
      classNames: classes,
      innerProps: {
        onConfirmText: 'Enviar'
      }
    })

  return (
    <ActionButton
      text="Avaliar"
      icon={<MdStarBorder size={28} />}
      onClick={openModalReviewCreate}
    />
  )
}
