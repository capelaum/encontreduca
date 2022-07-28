import { Anchor, Group, Title } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import logo from '@public/images/Home/logo.svg'
import Image from 'next/image'
import Link from 'next/link'

export function Logo() {
  const largeScreen = useMediaQuery('(min-width: 768px)', false)

  return (
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
  )
}
