import { Stack, Text, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { SectinTitle } from '../Shared/SectionTitle'

export function Description() {
  const largeScreen = useMediaQuery('(min-width: 992px)', false)
  const theme = useMantineTheme()

  return (
    <Stack
      pb={largeScreen ? 0 : 64}
      spacing={40}
      sx={{
        width: largeScreen ? '45%' : 'auto'
      }}
    >
      <SectinTitle title="Plataforma" />
      <Stack sx={{ color: theme.colors.brand[7], fontSize: '18px' }}>
        <Text>
          O <strong>mapa interativo</strong> é o foco principal de nossa
          plataforma, fornecendo um sistema de <strong>busca</strong> e
          <strong> filtragem</strong> dos recursos educacionais disponíveis.
        </Text>
        <Text>
          Acreditamos na força da comunidade e no poder da colaboração, por isso
          tornamos possível aos nossos usuários <strong>cadastrar</strong>,{' '}
          <strong>avaliar</strong>, e<strong> sugerir mudanças</strong> nos
          recursos educacionais.
        </Text>
        <Text>
          Prezando pelo <strong>bem-estar</strong>, disponibilizamos formas de
          sinalizar como inadequadas as avaliações de recursos, seja por
          qualquer motivo válido, como linguagem obscena ou spam.
        </Text>
        <Text>
          Adotamos um processo democrático, em que todo recurso educacional
          recém cadastrado, passará por um <strong>processo de votação</strong>{' '}
          da própria comunidade, antes de ser inserido de fato na plataforma.
        </Text>
      </Stack>
    </Stack>
  )
}
