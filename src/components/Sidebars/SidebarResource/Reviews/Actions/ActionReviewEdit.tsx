import { Box, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { useModals } from '@mantine/modals'
import { Title } from 'components/Shared/Title'
import { useResource } from 'contexts/resourceContext'
import { MdEdit } from 'react-icons/md'
import { modalStyles, useModalStyles } from 'styles/modalStyles'
import { Review } from 'types/reviews'
import { ActionItem } from './ActionItem'

interface ReviewEditProps {
  review: Review
}

export function ActionReviewEdit({ review }: ReviewEditProps) {
  const { openContextModal } = useModals()
  const { resource } = useResource()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { classes } = useModalStyles(dark)

  const openModalReviewEdit = () =>
    openContextModal('review', {
      title: <Title name={resource!.name} isModal />,
      ...modalStyles,
      classNames: classes,
      innerProps: {
        review,
        isEdit: true,
        onConfirmText: 'Atualizar'
      }
    })

  return (
    <ActionItem
      onClick={openModalReviewEdit}
      icon={
        <MdEdit
          size={14}
          color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}
        />
      }
    >
      <Box ml={8} sx={{ width: '120px' }}>
        Editar avaliação
      </Box>
    </ActionItem>
  )
}
