import { Box, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { useModals } from '@mantine/modals'
import {
  modalStyles,
  useModalStyles
} from 'components/Shared/styles/modalStyles'
import { Title } from 'components/Shared/Title'
import { useResource } from 'contexts/resourceContext'
import { MdWarning } from 'react-icons/md'
import { Review } from 'types/reviews'
import { getMotivesSelectData } from 'utils/modalSelecDataFormatter'
import { ActionItem } from '../ActionItem'

interface ReviewComplaintProps {
  review: Review
}

export function ReviewComplaint({ review }: ReviewComplaintProps) {
  const { motives } = useResource()

  const reviewComplaintMotives = getMotivesSelectData(
    motives,
    'review_complaint'
  )
  const { openContextModal } = useModals()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { classes } = useModalStyles(dark)

  const openModalReviewComplain = () => {
    openContextModal('select', {
      title: <Title name="Denunciar avaliação" isModal />,
      classNames: classes,
      ...modalStyles,
      innerProps: {
        motives: reviewComplaintMotives,
        isReviewComplaint: true,
        review
      }
    })
  }

  return (
    <ActionItem
      onClick={openModalReviewComplain}
      icon={<MdWarning size={14} color={theme.colors.cyan[3]} />}
    >
      <Box ml={8} sx={{ width: '200px' }}>
        Sinalizar como inadequado
      </Box>
    </ActionItem>
  )
}
