import { Box, Container, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useRouter } from 'next/router'
import { Logo } from './Logo'
import { NavLink } from './NavLink'

export function Header() {
  const largeScreen = useMediaQuery('(min-width: 768px)', false)
  const theme = useMantineTheme()

  const router = useRouter()

  // get current pathname
  const linkPath = router.pathname === '/home' ? '' : '/home'

  return (
    <Box
      component="header"
      px={24}
      py={20}
      sx={{
        display: 'flex',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1,
        backgroundColor: 'hsl(233 55% 8% / 0.9)',
        '@supports (backdrop-filter: blur(0.25rem))': {
          backgroundColor: 'hsl(233 55% 16% / 0.8)',
          backdropFilter: 'blur(0.25rem)'
        }
      }}
    >
      <Container
        px={0}
        size={1200}
        sx={{
          display: 'flex',
          flexDirection: largeScreen ? 'row' : 'column',
          gap: 24,
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        <Logo />

        <Box
          component="nav"
          pt={12}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: theme.white,
            gap: largeScreen ? '48px' : '32px'
          }}
        >
          <NavLink link="/">Mapa</NavLink>
          <NavLink link={`${linkPath}#about`}>Sobre</NavLink>
          <NavLink link={`${linkPath}#platform`}>Plataforma</NavLink>
          <NavLink link={`${linkPath}#faq`}>FAQ</NavLink>
        </Box>
      </Container>
    </Box>
  )
}
