import { MantineTheme, Text } from '@mantine/core'
import { OpenConfirmModal } from '@mantine/modals/lib/context'
import { Title } from 'components/Shared/Title'
import { showToast, ShowToastProps } from 'components/ToastMessage'
import { CloseButton } from '../Shared/CloseButton'
import { modalStyles } from '../Shared/modalStyles'

interface OpenModalReviewDeleteProps {
  title: string
  description: string
  toast: ShowToastProps
  openConfirmModal: (props: OpenConfirmModal) => string
  closeModal: (id: string, canceled?: boolean | undefined) => void
  classes: Record<'modal', string>
  theme: MantineTheme
  dark: boolean
}

export const openModalConfirm = ({
  title,
  description,
  toast,
  openConfirmModal,
  closeModal,
  classes,
  theme,
  dark
}: OpenModalReviewDeleteProps) => {
  const id = openConfirmModal({
    classNames: classes,
    ...modalStyles,
    title: <Title name={title} isModal />,
    children: (
      <>
        <CloseButton onClick={() => closeModal(id)} />
        <Text color={dark ? theme.colors.gray[0] : theme.colors.gray[8]}>
          {description}
        </Text>
      </>
    ),
    labels: { confirm: 'Confirmar', cancel: 'Cancelar' },
    cancelProps: {
      size: 'sm',
      radius: 'md',
      variant: 'outline',
      sx: {
        color: dark ? theme.colors.cyan[3] : theme.colors.brand[7],
        border: `1px solid ${
          dark ? theme.colors.cyan[3] : theme.colors.brand[7]
        }`
      }
    },
    confirmProps: {
      size: 'sm',
      radius: 'md',
      variant: 'filled',
      sx: {
        backgroundColor: dark ? theme.colors.cyan[3] : theme.colors.brand[7],
        color: dark ? theme.colors.brand[7] : theme.white,
        '&:hover': {
          backgroundColor: dark ? theme.colors.cyan[4] : theme.colors.brand[8]
        }
      }
    },
    onCancel: () => closeModal(id),
    onConfirm: () => {
      closeModal(id)
      showToast(toast)
    }
  })
}
