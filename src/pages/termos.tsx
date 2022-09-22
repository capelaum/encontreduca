import {
  Box,
  Center,
  CSSObject,
  List,
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

  const textStyles = (): CSSObject => ({
    color: theme.colors.brand[7],
    fontSize: '18px',
    fontWeight: 400
  })

  return (
    <>
      <Head>
        <title>Termos de Uso | Encontreduca</title>
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
            <SectionTitle title="Termos de uso" />

            <Space h={40} />

            <Stack
              sx={{
                color: theme.colors.brand[7],
                fontSize: '18px'
              }}
            >
              <Text>
                Em atenção à Lei Geral de Proteção de Dados (Lei nº 13.709/18
                com vigência a partir de 3 de maio de 2021), o site
                www.encontreduca.com.br, o domínio encontreduca.com.br e seu
                respectivo conteúdo são de propriedade de Luís Vinicius
                Capelletto. A plataforma Encontreduca visa trazer conteúdos
                meramente informativos ao(s) seus usuário(s), não estabelecendo,
                sob nenhuma hipótese, quaisquer vínculos consumerista, relação
                cliente-consumidor e/ou trabalhistas, entre outros.
              </Text>

              <Text>
                Usando ou acessando a plataforma ou pagando alguém para usar ou
                acessá-lo, o(a)(s) usuário(a)(s) formaliza(m) sua concordância
                com os termos e condições descritos abaixo.{' '}
                <strong>
                  Em caso de não concordância com os Termos e Condições de uso
                  descritos, a plataforma não deverá ser utilizada pelo(a)(s)
                  usuário(a)(s).
                </strong>
              </Text>

              <Text>
                Caso o(a) usuário(a) seja responsável, tutor ou ascendente que
                permita uma criança, pessoa menor de 18 (dezoito)anos de idade,
                acessar a plataforma, ele se responsabilizará por ela e pela sua
                utilização da plataforma.
              </Text>

              <Text>
                <strong>Dado pessoal: </strong>
                Toda e qualquer informação relacionada a pessoa natural
                identificada ou identificável.
              </Text>

              <Text>
                <strong>Dado pessoal sensível: </strong>
                Dado pessoal sobre origem racial ou étnica, convicção religiosa,
                opinião política, filiação a sindicato ou a organização de
                caráter religioso, filosófico ou político, dado referente à
                saúde ou à vida sexual, dado genético ou biométrico, quando
                vinculado a uma pessoa natural.
              </Text>

              <Text>
                <strong>Banco de dados: </strong>
                Conjunto estruturado de dados pessoais, estabelecido em um ou em
                vários locais, em suporte eletrônico ou físico.
              </Text>

              <Text>
                <strong>Tratamento: </strong>
                Toda operação realizada com dados pessoais, como as que se
                referem a coleta, produção, recepção, classificação, utilização,
                acesso, reprodução, transmissão, distribuição, processamento,
                arquivamento, armazenamento, eliminação, avaliação ou controle
                da informação, modificação, comunicação, transferência, difusão
                ou extração.
              </Text>
            </Stack>

            <Space h={40} />

            <List
              type="ordered"
              spacing="md"
              size="xl"
              sx={{ color: theme.colors.brand[7], fontWeight: 500 }}
            >
              <List.Item>
                Dados de Cadastro
                <Space h={16} />
                <Text sx={textStyles}>
                  O(A) usuário(a) que desejar se cadastrar na plataforma,
                  declara expressamente e de forma cumulativa:
                  <Space h={16} />
                  <List
                    withPadding
                    spacing="sm"
                    listStyleType="disc"
                    sx={{ color: theme.colors.brand[7], fontSize: '18px' }}
                  >
                    <List.Item>
                      Ser o titular dos seus próprios dados pessoais;
                    </List.Item>
                    <List.Item>
                      Que as informações repassadas são verídicas, sob pena de
                      incorrer em crime de falsidade ideológica<sup>1</sup>;
                    </List.Item>
                    <List.Item>
                      Consentir com o presente Termos de Uso;
                    </List.Item>
                    <List.Item>
                      Consentir com o tratamento de seus dados pessoais pela
                      plataforma Encontreduca, de acordo com a Política de
                      Privacidade.
                    </List.Item>
                  </List>
                </Text>
                <Space h={16} />
                <Text sx={{ ...textStyles(), fontSize: '14px' }}>
                  <sup>1</sup> Código Penal. Art. 299 - Omitir, em documento
                  público ou particular, declaração que dele devia constar, ou
                  nele inserir ou fazer inserir declaração falsa ou diversa da
                  que devia ser escrita, com o fim de prejudicar direito, criar
                  obrigação ou alterar a verdade sobre fato juridicamente
                  relevante:Pena - reclusão, de um a cinco anos, e multa, se o
                  documento é público, e reclusão de um a três anos, e multa, de
                  quinhentos mil réis a cinco contos de réis, se o documento é
                  particular. Parágrafo único - Se o agente é funcionário
                  público, e comete o crime prevalecendo-se do cargo, ou se a
                  falsificação ou alteração é de assentamento de registro civil,
                  aumenta-se a pena de sexta parte.
                </Text>
              </List.Item>

              <List.Item>
                Plataforma
                <Space h={16} />
                <Text sx={textStyles}>
                  A plataforma Encontreduca possui apenas e tão somente caráter
                  acadêmico, não constituindo, sob hipótese alguma, atividade
                  comercial.
                </Text>
              </List.Item>

              <List.Item>
                Conteúdo
                <Space h={16} />
                <Stack spacing={12}>
                  <Text sx={textStyles}>
                    Todos os textos, gráficos, interfaces de usuários, marcas
                    registradas, logos, fotografias, entre outras obras
                    intelectuais no site são de propriedade, controlados ou
                    licenciados à plataforma Encontreduca e são protegidos por
                    leis de direitos autorais e de propriedade intelectual.
                    Também, todo o material é publicado somente para fins
                    acadêmicos, não constituindo atividade comercial.
                  </Text>

                  <Text sx={textStyles}>
                    É expressamente vedada a comercialização de qualquer título
                    ou forma, da totalidade ou de parte das informações, dos
                    materiais, textos, gráficos, marcas, além de outros
                    conteúdos da plataforma Encontreduca sem expressa anuência
                    da mesma.
                  </Text>
                </Stack>
              </List.Item>

              <List.Item>
                Copyright
                <Space h={16} />
                <Text sx={textStyles}>
                  Todos os textos, gráficos, interfaces de usuários, marcas
                  registradas, logos, fotografias, entre outras obras
                  intelectuais produzidos pela plataforma Encontreduca devem ser
                  considerados apenas como material de cárter acadêmico
                  informativo e não devem ser considerados como materiais
                  comerciais.
                </Text>
              </List.Item>

              <List.Item>
                Mudanças
                <Space h={16} />
                <Text sx={textStyles}>
                  A plataforma Encontreduca poderá, a qualquer momento e a seu
                  exclusivo critério, modificar a configuração de seu site,
                  podendo inclusive alterar os regulamentos, o presente Termos
                  de Uso, a Política de Privacidade e demais textos e conteúdo
                  do site, sem necessidade de qualquer prévia notificação aos
                  usuários. O uso deste site após as mudanças efetuadas
                  significará que o usuário aceita e concorda automaticamente
                  com as referidas mudanças.
                </Text>
              </List.Item>

              <List.Item>
                Responsabilidade
                <Space h={16} />
                <Stack spacing={12}>
                  <Text sx={textStyles}>
                    A plataforma Encontreduca não se responsabiliza por
                    informações publicadas em outros sites, para os quais este
                    site contenha links.
                  </Text>

                  <Text sx={textStyles}>
                    A plataforma Encontreduca não deverá, em hipótese alguma,
                    ser responsabilizado perante qualquer pessoa, por qualquer
                    tipo de perda, dano, custo ou despesa resultante de qualquer
                    erro, omissão, ou alteração nas informações aqui fornecidas,
                    nem tampouco por quaisquer atrasos, inexatidões, erros, ou
                    interrupções ocasionados em função destes eventos, durante o
                    suprimento de qualquer informação através das páginas do
                    site.
                  </Text>
                </Stack>
              </List.Item>

              <List.Item>
                Obrigações do(a)(s) Usuário(a)(s)
                <Space h={16} />
                <Stack spacing={12}>
                  <Text sx={textStyles}>
                    Considerando o caráter meramente acadêmico informativo da
                    plataforma Encontreduca e o conteúdo nela disposto, o(a)(s)
                    usuário(a)(s) concorda(m) expressamente, sob pena de
                    suspensão ou banimento da plataforma, em:
                  </Text>

                  <Space h={16} />
                  <List
                    withPadding
                    spacing="sm"
                    listStyleType="disc"
                    sx={{
                      color: theme.colors.brand[7],
                      fontSize: '18px',
                      fontWeight: 400
                    }}
                  >
                    <List.Item>
                      Não compartilhar dados pessoais sensíveis;
                    </List.Item>

                    <List.Item>
                      Não praticar atos imorais ou antiéticos;
                    </List.Item>

                    <List.Item>
                      Não praticar atos de manipulação, maliciosos ou
                      interferência na plataforma Encontreduca;
                    </List.Item>

                    <List.Item>
                      Não realizar cópia do layout, design, logo, marca,
                      conteúdo e artigos nele contido, sem prévia autorização ou
                      licença expressa da plataforma Encontreduca;
                    </List.Item>

                    <List.Item>
                      Consentir com o presente Termos de Uso.
                    </List.Item>
                  </List>
                </Stack>
              </List.Item>

              <List.Item>
                Privacidade
                <Space h={16} />
                <Stack spacing={12}>
                  <Text sx={textStyles}>
                    As informações coletadas a partir do acesso a nossa
                    plataforma não são ou serão compartilhadas com outras
                    empresas, organizações ou escritórios. A plataforma
                    Encontreduca utiliza cookies - qualquer dispositivo que vise
                    permitir a troca de dados entre o navegador e o servidor de
                    páginas e que seja colocado em um arquivo de texto criado no
                    computador do usuário de modo a manter a persistência de
                    sessões http.
                  </Text>
                </Stack>
              </List.Item>

              <List.Item>
                Foro
                <Space h={16} />
                <Stack spacing={12}>
                  <Text sx={textStyles}>
                    As partes elegem o foro de Brasília, Distrito Federal, como
                    competente para dirimir quaisquer controvérsias decorrentes
                    deste “Temo de Uso”, independentemente de qualquer outro,
                    por mais privilegiado que seja ou venha a ser. A plataforma
                    Encontreduca, entretanto, poderá atuar judicialmente em
                    qualquer país para proteger seus interesses e direitos. A
                    lei brasileira será aplicável para reger e interpretar este
                    Termo de Uso.
                  </Text>
                </Stack>
              </List.Item>
            </List>
          </Box>
        </Center>
      </Box>

      <Footer />
    </>
  )
}
