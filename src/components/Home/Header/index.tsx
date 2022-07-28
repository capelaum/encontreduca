import {
  Anchor,
  Box,
  Container,
  Group,
  Title,
  useMantineTheme
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import logo from '@public/images/Home/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { NavLink } from './NavLink'

export function Header() {
  const largeScreen = useMediaQuery('(min-width: 768px)', false)
  const theme = useMantineTheme()

  return (
    <Box
      component="header"
      px={24}
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgba(18, 23, 62, 0.7)'
      }}
    >
      <Container
        py={24}
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
        <Link href="#hero" passHref>
          <Anchor component="a" variant="text">
            <Group align="center" spacing={12} noWrap>
              <Image
                src={logo}
                alt="Logo com um marcador de local em azul claro com um mapa e um fundo azul mais claro de background"
              />
              <Title order={1} sx={{ fontSize: largeScreen ? '32px' : '28px' }}>
                Encontreduca
              </Title>
            </Group>
          </Anchor>
        </Link>

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
          <NavLink link="#about">Sobre</NavLink>
          <NavLink link="#faq">FAQ</NavLink>
          <NavLink link="/">Mapa</NavLink>
          <NavLink link="/login">Entrar</NavLink>
        </Box>
      </Container>
    </Box>
  )
}
