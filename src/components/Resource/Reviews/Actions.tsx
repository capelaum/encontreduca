import { Menu } from '@mantine/core'
import { ReviewComplain } from './ModalActions/ReviewComplain'
import { ReviewDelete } from './ModalActions/ReviewDelete'
import { ReviewEdit } from './ModalActions/ReviewEdit'

interface ActionsProps {
  isOwnReview?: boolean
}

export function Actions({ isOwnReview }: ActionsProps) {
  function renderMenuItems() {
    if (isOwnReview) {
      return (
        <>
          <ReviewEdit />
          <ReviewDelete />
        </>
      )
    }

    return <ReviewComplain />
  }

  return (
    <Menu
      position="right"
      sx={{ transform: 'rotate(90deg)' }}
      transition="pop-top-left"
      radius="sm"
      size={isOwnReview ? 'sm' : 220}
    >
      {renderMenuItems()}
    </Menu>
  )
}
