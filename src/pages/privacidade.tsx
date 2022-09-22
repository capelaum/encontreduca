import {
  Anchor,
  Box,
  Center,
  Space,
  Stack,
  Text,
  useMantineTheme
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { Footer } from 'components/Home/Footer'
import { Header } from 'components/Home/Header'
import { SectionTitle } from 'components/Home/Sections/Shared/SectionTitle'
import Head from 'next/head'

export default function Home() {
  const largeScreen = useMediaQuery('(min-width: 768px)', false)
  const theme = useMantineTheme()

  return (
    <>
      <Head>
        <title>Política de Privacidade | Encontreduca</title>
      </Head>

      <Header />

      <Box component="main">
        <Center
          pt={largeScreen ? 168 : 200}
          pb={80}
          px={20}
          sx={{
            backgroundColor: theme.colors.gray[0]
          }}
          id="platform"
        >
          <Box sx={{ width: '100%', maxWidth: '1200px' }}>
            <SectionTitle title="Política de Privacidade" />

            <Space h={40} />

            <Stack
              sx={{
                color: theme.colors.brand[7],
                fontSize: '18px'
              }}
            >
              <Text>
                A sua privacidade é importante para nós. Operamos com a política
                de respeitar a sua privacidade em relação à qualquer informação
                sua que coletamos na plataforma Encontreduca. Solicitamos
                informações pessoais não confidenciais para a realização do
                cadastro na plataforma Encontreduca, com a finalidade exclusiva
                de identificação junto à plataforma, por meios justos e legais,
                com o seu conhecimento e consentimento, informando por que
                estamos coletando e como será usado.
              </Text>

              <Text>
                Retemos as informações coletadas pelo tempo necessário para
                fornecer o serviço solicitado. Quando armazenamos dados,
                protegemos dentro de meios comercialmente aceitáveis para evitar
                perdas e roubos de dados, bem como acesso, divulgação, cópia,
                uso ou modificação não autorizados.
              </Text>

              <Text>
                Não vendemos ou compartilhamos informações de identificação
                pessoal publicamente ou com terceiros, exceto quando exigido por
                lei. A plataforma Encontreduca pode ter links para sites
                externos que não são operados por nós. Esteja ciente de que não
                temos controle sobre o conteúdo e práticas desses sites e não
                podemos aceitar responsabilidade por suas respectivas políticas
                de privacidade.
              </Text>

              <Text>
                Mais informações, sugestões e/ou reclamações, por favor entre em
                contato com a gente pelo o número através do e-mail{' '}
                <Anchor
                  sx={{
                    color: theme.colors.cyan[7],
                    transition: '0.3s ease-out',
                    '&:hover': {
                      color: theme.colors.cyan[5]
                    }
                  }}
                >
                  contato@encontreduca.com.br
                </Anchor>
              </Text>

              <Text>Esta política é efetiva a partir de Setembro de 2022.</Text>
            </Stack>
          </Box>
        </Center>
      </Box>

      <Footer />
    </>
  )
}
