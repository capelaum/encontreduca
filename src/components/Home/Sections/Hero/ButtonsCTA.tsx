import { Button, Group, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import Link from 'next/link'

export function ButtonsCTA() {
  const largeScreen = useMediaQuery('(min-width: 992px)', false)
  const smallScreen = useMediaQuery('(max-width: 480px)', false)

  const theme = useMantineTheme()

  return (
    <Group
      pt={theme.spacing.md}
      position={largeScreen ? 'left' : 'center'}
      noWrap
    >
      <Link href="/login" passHref>
        <Button
          component="a"
          size={smallScreen ? 'sm' : 'md'}
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
          Cadastre-se
        </Button>
      </Link>
      <Link href="/" passHref>
        <Button
          component="a"
          size={smallScreen ? 'sm' : 'md'}
          radius="sm"
          variant="outline"
          sx={{
            color: theme.colors.cyan[3],
            border: `1px solid ${theme.colors.cyan[3]}`
          }}
        >
          Mapa
        </Button>
      </Link>
    </Group>
  )
}
