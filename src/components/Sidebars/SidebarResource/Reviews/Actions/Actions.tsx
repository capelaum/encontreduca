import {
  Button,
  Menu,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Review } from 'types/reviews'
import { ActionReviewComplaint } from './ActionReviewComplaint'
import { ActionReviewDelete } from './ActionReviewDelete'
import { ActionReviewEdit } from './ActionReviewEdit'

interface ActionsProps {
  isOwnReview?: boolean
  review: Review
}

export function Actions({ isOwnReview, review }: ActionsProps) {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  function renderMenuItems() {
    if (isOwnReview) {
      return (
        <>
          <ActionReviewEdit review={review} />
          <ActionReviewDelete reviewId={review.id} />
        </>
      )
    }

    return <ActionReviewComplaint review={review} />
  }

  return (
    <Menu
      position="left-start"
      transition="pop-top-right"
      radius="md"
      offset={12}
    >
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
          backgroundColor: dark ? theme.colors.brand[8] : theme.colors.gray[3],
          color: dark ? theme.colors.cyan[3] : theme.colors.brand[7],
          border: 'none',
          zIndex: 333
        }}
      >
        {renderMenuItems()}
      </Menu.Dropdown>
    </Menu>
  )
}
