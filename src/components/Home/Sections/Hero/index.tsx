import { Group } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import hero from '@public/images/hero.svg'
import Image from 'next/image'
import { LeftSide } from './LeftSide'

export function Hero() {
  const largeScreen = useMediaQuery('(min-width: 992px)', false)

  return (
    <Group
      my={100}
      mx={24}
      position={largeScreen ? 'apart' : 'center'}
      align="center"
      spacing={0}
    >
      <LeftSide />

      <Image
        src={hero}
        alt="Homem em pé olhando o celular e um mockup de celular com um mapa atrás."
      />
    </Group>
  )
}
