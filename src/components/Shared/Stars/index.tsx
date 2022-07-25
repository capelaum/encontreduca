import { useMantineTheme } from '@mantine/core'
import { MdStar, MdStarBorder } from 'react-icons/md'

export function Stars() {
  const theme = useMantineTheme()

  return (
    <>
      <MdStar size={18} color={theme.colors.yellow[6]} />
      <MdStar size={18} color={theme.colors.yellow[6]} />
      <MdStar size={18} color={theme.colors.yellow[6]} />
      <MdStar size={18} color={theme.colors.yellow[6]} />
      <MdStarBorder size={18} />
    </>
  )
}
