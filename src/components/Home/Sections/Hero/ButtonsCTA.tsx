import { Button, Group, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import Link from 'next/link'
import { useState } from 'react'

export function ButtonsCTA() {
  const [isLoading, setIsLoading] = useState(false)
  const largeScreen = useMediaQuery('(min-width: 992px)', false)

  const theme = useMantineTheme()

  return (
    <Group
      pt={theme.spacing.md}
      position={largeScreen ? 'left' : 'center'}
      noWrap
    >
      <Link href="/" passHref>
        <Button
          title="Mapa Interativo - Encontreduca"
          component="a"
          size="md"
          radius="sm"
          variant="default"
          loaderPosition="right"
          loading={isLoading}
          onClick={() => setIsLoading(true)}
          sx={{
            backgroundColor: theme.colors.cyan[3],
            color: theme.colors.brand[7],
            border: 'none',
            '&:hover': {
              backgroundColor: theme.colors.cyan[4]
            }
          }}
        >
          Mapa Interativo
        </Button>
      </Link>
    </Group>
  )
}
