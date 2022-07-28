import { Group } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import course from '@public/images/Home/markers/course.svg'
import coworking from '@public/images/Home/markers/coworking.svg'
import library from '@public/images/Home/markers/library.svg'
import school from '@public/images/Home/markers/school.svg'
import university from '@public/images/Home/markers/university.svg'
import Image from 'next/image'
import { SectionContainer } from '../Shared/SectionContainer'
import { SectionTitle } from '../Shared/SectionTitle'

export function Resources() {
  const largeScreen = useMediaQuery('(min-width: 992px)', false)

  return (
    <SectionContainer id="hero">
      <SectionTitle title="Recursos educacionais" isDark />

      <Group
        align="center"
        position={largeScreen ? 'apart' : 'center'}
        spacing={largeScreen ? 20 : 88}
        mt={80}
      >
        <Image
          src={school}
          alt="Marcador de mapa amarelo com icone de escola no centro."
        />
        <Image
          src={university}
          alt="Marcador de mapa roxo com icone de universidae no centro."
        />
        <Image
          src={course}
          alt="Marcador de mapa azul com icone de curso no centro."
        />
        <Image
          src={library}
          alt="Marcador de mapa verde com icone de biblioteca no centro."
        />
        <Image
          src={coworking}
          alt="Marcador de mapa vermelhor com icone de coworking no centro."
        />
      </Group>
    </SectionContainer>
  )
}
