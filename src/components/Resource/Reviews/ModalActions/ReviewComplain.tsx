import { Menu } from '@mantine/core'
import { useModals } from '@mantine/modals'
import { Title } from 'components/Shared/Title'
import data from 'data/motives.json'
import { TiCancel } from 'react-icons/ti'
import { getModalSelectDataMotives } from 'utils/modalSelecDataFormatter'

export function ReviewComplain() {
  const reviewMotives = getModalSelectDataMotives(data.motives, 'review')
  const { openContextModal } = useModals()

  const openModalReviewComplain = () => {
    openContextModal('select', {
      title: <Title name="Denunciar avaliação" isModal />,
      radius: 'md',
      centered: true,
      withCloseButton: false,
      padding: 'md',
      innerProps: { data: reviewMotives }
    })
  }

  return (
    <Menu.Item
      icon={<TiCancel size={18} color="cyan" />}
      onClick={openModalReviewComplain}
    >
      Sinalizar como inadequado
    </Menu.Item>
  )
}
