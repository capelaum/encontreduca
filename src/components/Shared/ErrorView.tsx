import { Button, Center, Title, useMantineTheme } from '@mantine/core'
import Link from 'next/link'

interface ErrorViewProps {
  message: string
}

export function ErrorView({ message }: ErrorViewProps) {
  const theme = useMantineTheme()

  return (
    <Center
      sx={{
        backgroundColor: theme.colors.brand[7],
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <Title
        mb={48}
        order={1}
        align="center"
        sx={{
          color: theme.colors.cyan[3],
          fontSize: theme.fontSizes.xl,
          fontWeight: 500
        }}
      >
        {message}
      </Title>

      <Link href="/home" passHref>
        <Button
          component="a"
          size="md"
          radius="sm"
          variant="default"
          sx={{
            backgroundColor: theme.colors.cyan[3],
            color: theme.colors.brand[7],
            border: 'none',
            '&:hover': {
              backgroundColor: theme.colors.cyan[4]
            }
          }}
        >
          Voltar para Home
        </Button>
      </Link>
    </Center>
  )
}
