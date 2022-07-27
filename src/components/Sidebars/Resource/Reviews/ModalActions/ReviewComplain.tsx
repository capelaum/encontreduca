import { Box, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { useModals } from '@mantine/modals'
import {
  modalStyles,
  useModalStyles
} from 'components/Modals/Shared/modalStyles'
import { Title } from 'components/Shared/Title'
import data from 'data/motives.json'
import { MdWarning } from 'react-icons/md'
import { getModalSelectDataMotives } from 'utils/modalSelecDataFormatter'
import { ActionItem } from '../ActionItem'

export function ReviewComplain() {
  const reviewMotives = getModalSelectDataMotives(data.motives, 'review')
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
      innerProps: { data: reviewMotives, isReviewComplaint: true }
    })
  }

  return (
    <ActionItem
      onClick={openModalReviewComplain}
      icon={
        <MdWarning
          size={14}
          color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}
        />
      }
    >
      <Box ml={8} sx={{ width: '200px' }}>
        Sinalizar como inadequado
      </Box>
    </ActionItem>
  )
}
