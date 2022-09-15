import { Group, useMantineTheme } from '@mantine/core'
import { MdStar, MdStarBorder } from 'react-icons/md'

interface StarsProps {
  rating: number
}

export function Stars({ rating }: StarsProps) {
  const theme = useMantineTheme()

  const renderStars = () => {
    const starComponents = [1, 2, 3, 4, 5].map((_, index) => {
      const starIndex: number = index + 1

      return starIndex <= Math.round(rating) ? (
        <MdStar key={starIndex} size={18} color={theme.colors.yellow[6]} />
      ) : (
        <MdStarBorder key={starIndex} size={18} color={theme.colors.gray[6]} />
      )
    })

    return starComponents
  }

  return <Group spacing={2}>{renderStars()}</Group>
}
