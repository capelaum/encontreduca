import { Group, useMantineTheme } from '@mantine/core'
import { MdStar, MdStarBorder } from 'react-icons/md'

interface StarsProps {
  rating: number
}

export function Stars({ rating }: StarsProps) {
  const theme = useMantineTheme()

  const renderStars = () => {
    const starComponents = [...Array(5)].map((star, index) => {
      const starIndex = index + 1

      if (starIndex <= Math.round(rating))
        return (
          <MdStar key={starIndex} size={18} color={theme.colors.yellow[6]} />
        )

      return (
        <MdStarBorder key={starIndex} size={18} color={theme.colors.gray[6]} />
      )
    })

    return starComponents
  }

  return <Group spacing={2}>{renderStars()}</Group>
}
