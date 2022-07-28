import { Box, Group } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import about from '@public/images/Home/about.svg'
import Image from 'next/image'
import { Description } from '../Platform/Description'
import { SectionContainer } from '../Shared/SectionContainer'

const paragraphs = [
  'A ideação, pesquisa envolvida e definição das funcionalidades do projeto <strong>Encontreduca</strong>, foram concebidas com o intuito de gerar, através da tecnologia, impacto social positivo, contribuindo para o cenário educacional atual do Brasil.',
  'Esse projeto tem caráter acadêmico e foi desenvolvido por <strong>Luís Vinicius Capelletto</strong>, como Trabalho de Conclusão de Curso de Engenharia da Computação, pela Universidade de Brasília (UnB) e orientado pelo professor <strong>José Edil Guimarães De Medeiros</strong>.'
]

export function About() {
  const largeScreen = useMediaQuery('(min-width: 992px)', false)

  return (
    <SectionContainer id="about">
      <Group
        position={largeScreen ? 'apart' : 'center'}
        align="center"
        spacing={largeScreen ? 0 : 80}
      >
        <Description title="Sobre" paragraphs={paragraphs} isDark />

        <Box
          sx={{
            width: largeScreen ? '45%' : 'auto'
          }}
        >
          <Image
            src={about}
            alt="Garoto sentado com uma tela atrás contendo uma lupa lostrando um marcador de mapa."
          />
        </Box>
      </Group>
    </SectionContainer>
  )
}
