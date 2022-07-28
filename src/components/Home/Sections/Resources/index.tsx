import { Container, Group } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import course from '@public/images/Home/markers/course.svg'
import coworking from '@public/images/Home/markers/coworking.svg'
import library from '@public/images/Home/markers/library.svg'
import school from '@public/images/Home/markers/school.svg'
import university from '@public/images/Home/markers/university.svg'
import Image from 'next/image'
import { SectinTitle } from '../Shared/SectionTitle'

export function Resources() {
  const largeScreen = useMediaQuery('(min-width: 992px)', false)

  return (
    <Container my={100} size={1200} px={24} id="hero">
      <SectinTitle title="Plataforma" isDark />

      <Group
        align="center"
        position={largeScreen ? 'apart' : 'center'}
        spacing={largeScreen ? 20 : 88}
        mt={80}
      >
        <Image src={school} />

        <Image src={university} />

        <Image src={course} />
        <Image src={library} />
        <Image src={coworking} />
      </Group>
    </Container>
  )
}
