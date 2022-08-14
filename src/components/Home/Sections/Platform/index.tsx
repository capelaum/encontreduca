import { Box, Center, Group, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import platform from '@public/images/Home/platform.svg'
import Image from 'next/image'
import { Description } from '../Shared/Description'

const paragraphs = [
  {
    id: 1,
    text: 'O <strong>mapa interativo</strong> é o foco principal de nossa plataforma, fornecendo um sistema de <strong>busca</strong> e <strong> filtragem</strong> dos recursos educacionais disponíveis.'
  },
  {
    id: 2,
    text: 'Acreditamos na força da comunidade e no poder da colaboração, por isso tornamos possível aos nossos usuários <strong>cadastrar</strong>, <strong>avaliar</strong>, e <strong> sugerir mudanças</strong> nos recursos educacionais.'
  },
  {
    id: 3,
    text: 'Prezando pelo <strong>bem-estar</strong>, disponibilizamos formas de sinalizar como inadequadas as avaliações de recursos, seja por qualquer motivo válido, como linguagem obscena ou spam.'
  },
  {
    id: 4,
    text: 'Adotamos um processo democrático, em que todo recurso educacional recém cadastrado, passará por um <strong>processo de votação</strong> da própria comunidade, antes de ser inserido de fato na plataforma.'
  }
]

export function Platform() {
  const largeScreen = useMediaQuery('(min-width: 992px)', false)
  const theme = useMantineTheme()

  return (
    <Center
      py={120}
      sx={{
        backgroundColor: theme.colors.gray[0],
        transform: 'skewY(3deg)'
      }}
      id="platform"
    >
      <Group
        position={largeScreen ? 'apart' : 'center'}
        align="center"
        mx={24}
        spacing={largeScreen ? 0 : 64}
        sx={{
          maxWidth: '1200px',
          backgroundColor: theme.colors.gray[0],
          transform: 'skewY(-3deg)'
        }}
      >
        <Box
          sx={{
            width: largeScreen ? '45%' : 'auto'
          }}
        >
          <Image
            src={platform}
            alt="2 pessoas olhando para um tela com o mapa interativo dark do Encontreduca"
          />
        </Box>
        <Description title="Plataforma" paragraphs={paragraphs} />
      </Group>
    </Center>
  )
}
