import {
  Button,
  Center,
  Stack,
  Title,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { UserReview } from './UserReview'

export function Reviews() {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <>
      <Title
        order={2}
        px="md"
        mb={24}
        sx={{
          fontSize: theme.fontSizes.lg
        }}
      >
        Sua avaliação
      </Title>

      <UserReview isOwnReview />

      <Title
        order={2}
        px="md"
        mb={24}
        sx={{
          fontSize: theme.fontSizes.lg
        }}
      >
        Avaliações
      </Title>

      <Stack spacing={24}>
        <UserReview />
        <UserReview />
        <UserReview />
      </Stack>

      <Center my={32}>
        <Button
          variant="subtle"
          compact
          size="sm"
          sx={{
            color: dark ? theme.colors.cyan[3] : theme.colors.brand[7],
            '&:hover': {
              backgroundColor: dark
                ? theme.colors.brand[8]
                : theme.colors.gray[1]
            }
          }}
        >
          Mais avalições (17)
        </Button>
      </Center>
    </>
  )
}
