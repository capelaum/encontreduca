import {
  createStyles,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useModals } from '@mantine/modals'
import { Title } from 'components/Shared/Title'
import { useSidebar } from 'contexts/sidebarContext'
import { MdStarBorder } from 'react-icons/md'
import { ActionButton } from '../ActionButton'

const useStyles = createStyles((theme, dark: boolean) => ({
  modal: {
    backgroundColor: dark ? theme.colors.brand[7] : theme.colors.gray[0]
  }
}))

export function ReviewCreate() {
  const { openContextModal } = useModals()
  const { resource } = useSidebar()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { classes } = useStyles(dark)

  const openModalReviewCreate = () =>
    openContextModal('review', {
      title: <Title name={resource!.name} isModal />,
      radius: 'md',
      centered: true,
      withCloseButton: false,
      padding: 'md',
      classNames: classes,
      innerProps: {
        onConfirmText: 'Enviar',
        backgroundColor: dark ? theme.colors.brand[7] : theme.white
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
