import {
  Button,
  Center,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { ResourceType } from 'types/resources'
import { Review } from 'types/reviews'

interface DefaultLoadMoreButtonProps {
  end: number
  step: number
  setEnd: (end: number) => void
  data: ResourceType[] | Review[]
}

export function DefaultLoadMoreButton({
  end,
  step,
  setEnd,
  data
}: DefaultLoadMoreButtonProps) {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <Center mb={32}>
      <Button
        variant="subtle"
        compact
        size="sm"
        onClick={() => setEnd(end + step)}
        sx={{
          color: dark ? theme.colors.cyan[3] : theme.colors.brand[7],
          '&:hover': {
            backgroundColor: dark ? theme.colors.brand[8] : theme.colors.gray[1]
          }
        }}
      >
        Carregar mais ({data.length - end})
      </Button>
    </Center>
  )
}
