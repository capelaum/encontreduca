import { Loader, Stack, Title } from '@mantine/core'

export function MapLoader() {
  return (
    <Stack
      spacing="md"
      align="center"
      justify="center"
      sx={(theme) => ({
        backgroundColor: theme.colors.brand[7],
        width: '100%',
        height: '100vh'
      })}
    >
      <Loader size="xl" color="cyan" />
      <Title
        order={1}
        align="center"
        sx={(theme) => ({
          color: theme.colors.cyan[3],
          fontSize: theme.fontSizes.xl,
          fontWeight: 500
        })}
      >
        Carregando...
      </Title>
    </Stack>
  )
}
