import { Button, Center, Stack, Title } from '@mantine/core'
import { UserReview } from './UserReview'

export function UserReviews() {
  return (
    <>
      <Title
        order={2}
        px="md"
        mb={24}
        sx={(theme) => ({
          fontSize: theme.fontSizes.lg
        })}
      >
        Sua avaliação
      </Title>

      <UserReview isOwnReview />

      <Title
        order={2}
        px="md"
        mb={24}
        sx={(theme) => ({
          fontSize: theme.fontSizes.lg
        })}
      >
        Avaliações
      </Title>

      <Stack spacing={24}>
        <UserReview />
        <UserReview />
        <UserReview />
      </Stack>

      <Center my={32}>
        <Button variant="light" compact size="md">
          Mais avalições (17)
        </Button>
      </Center>
    </>
  )
}
