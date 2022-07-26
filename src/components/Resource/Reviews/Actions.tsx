import { Menu, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { ReviewComplain } from './ModalActions/ReviewComplain'
import { ReviewDelete } from './ModalActions/ReviewDelete'
import { ReviewEdit } from './ModalActions/ReviewEdit'

interface ActionsProps {
  isOwnReview?: boolean
}

export function Actions({ isOwnReview }: ActionsProps) {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

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
      transition="pop-top-left"
      radius="sm"
      size={isOwnReview ? 'sm' : 220}
      sx={{
        transform: 'rotate(90deg)',
        button: {
          color: dark ? theme.colors.cyan[3] : theme.colors.gray[9],
          '&:hover': {
            backgroundColor: dark ? theme.colors.brand[7] : theme.colors.gray[1]
          }
        }
      }}
    >
      {renderMenuItems()}
    </Menu>
  )
}
