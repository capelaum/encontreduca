import {
  Button,
  Menu,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { BsThreeDotsVertical } from 'react-icons/bs'
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
    <Menu position="right" transition="pop-top-left" radius="md" offset={4}>
      <Menu.Target>
        <Button
          size="xs"
          sx={{
            padding: '2px',
            backgroundColor: dark
              ? theme.colors.brand[7]
              : theme.colors.gray[0],
            '&:hover': {
              backgroundColor: dark
                ? theme.colors.brand[8]
                : theme.colors.gray[2]
            }
          }}
        >
          <BsThreeDotsVertical size={18} color={theme.colors.gray[6]} />
        </Button>
      </Menu.Target>

      <Menu.Dropdown
        sx={{
          backgroundColor: dark ? theme.colors.brand[8] : theme.colors.gray[1],
          color: dark ? theme.colors.cyan[3] : theme.colors.brand[7],
          border: 'none'
        }}
      >
        {renderMenuItems()}
      </Menu.Dropdown>
    </Menu>
  )
}
