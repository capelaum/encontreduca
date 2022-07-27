import { Group } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import hero from '@public/images/hero.png'
import Image from 'next/image'
import { LeftSide } from './LeftSide'

export function Hero() {
  const largeScreen = useMediaQuery('(min-width: 992px)', false)

  return (
    <Group
      my={100}
      position={largeScreen ? 'apart' : 'center'}
      align="center"
      spacing={0}
    >
      <LeftSide />

      <Image
        src={hero}
        alt="Home em pé com camisa azul claro e um background de um mockup de celular com um mapa em branco e azul claro na tela"
      />
    </Group>
  )
}
