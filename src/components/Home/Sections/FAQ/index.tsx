import {
  Accordion,
  Anchor,
  Box,
  Center,
  Text,
  useMantineTheme
} from '@mantine/core'
import { useState } from 'react'
import { TbPlus } from 'react-icons/tb'
import { SectionContainer } from '../Shared/SectionContainer'
import { SectionTitle } from '../Shared/SectionTitle'

const faq = [
  {
    id: 1,
    title: 'O que é a plataforma Encontreduca?',
    content:
      'Encontreduca é um projeto que tem como objetivo facilitar a indentificar e localizar os recursos educacionais mais próximos.'
  },
  {
    id: 2,
    title: 'Quais benefícios tenho ao me cadastrar?',
    content:
      'Apenas usuários cadastrados podem cadastrar, avaliar, votar e sugerir mudanças aos recursos educacionais da plataforma, portanto usuários não cadastrados podem apenas encontrar os recursos e visualizar suas informações através do mapa interativo.'
  },
  {
    id: 3,
    title:
      'Preciso informar algum cartão de crédito ou meio de pagamento ao me cadastrar?',
    content:
      'Não! Esse projeto tem caráter acadêmico informativo e todos os recursos da plataforma são gratuitos atualmente.'
  },
  {
    id: 4,
    title: 'Ao cadastrar um recurso, ele é adicionado automaticamente ao mapa?',
    content:
      'Não, com o intuito de manter a qualidade das informações dos recursos educacionais presentes na plataforma, recursos recem adicionados passarão por um processo de votação e aprovação do administrador.'
  },
  {
    id: 5,
    title: 'Como funciona o processo de votação?',
    content:
      'Pelo nosso painel de votação, o usuário poderá escolher algum dos recursos educacionais ainda não aprovados, podendo votar a favor ou contra a inserção do recurso no mapa. Ressalta-se que recursos educacionais com muitos votos positivos aumentam a probabilidade, mas não garantem a sua inserção na plataforma.'
  },
  {
    id: 6,
    title: 'Posso cadastrar recursos educacionais de qualquer lugar?',
    content:
      'Sim, porém na fase inicial do projeto serão priorizados recursos educacionais localizados em Brasília e cidades satélites.'
  }
]

export function FAQ() {
  const theme = useMantineTheme()

  const [value, setValue] = useState<string[]>([])

  const accordionStyles = () => ({
    chevron: {
      color: theme.colors.brand[7],
      '&[data-rotate]': {
        color: theme.colors.cyan[3]
      }
    },

    item: {
      color: theme.colors.brand[7],
      backgroundColor: theme.white,
      '.mantine-Accordion': {
        '&-control': {
          color: theme.colors.brand[7],
          backgroundColor: theme.colors.gray[1],
          transition: 'all 0.2s ease-in-out',
          borderLeft: `7px solid ${theme.colors.brand[7]}`,
          '&:hover': {
            backgroundColor: theme.colors.cyan[1]
          }
        },
        '&-label': {
          fontWeight: 600
        },
        '&-content': {
          backgroundColor: theme.colors.brand[7]
        }
      },
      '&[data-active]': {
        '.mantine-Accordion': {
          '&-control': {
            color: theme.colors.cyan[3],
            backgroundColor: theme.colors.brand[7]
          },
          '&-content': {
            color: theme.white,
            backgroundColor: theme.colors.brand[7]
          }
        }
      }
    }
  })

  return (
    <Center
      sx={{
        backgroundColor: theme.colors.gray[0],
        transform: 'skewY(3deg)',
        transformOrigin: 'top left'
      }}
    >
      <Box
        sx={{
          transform: 'skewY(-3deg)',
          width: '100%',
          marginBottom: '100px'
        }}
      >
        <SectionContainer id="faq">
          <SectionTitle title="FAQ" />

          <Accordion
            multiple
            order={3}
            variant="separated"
            onChange={setValue}
            chevron={<TbPlus size={20} />}
            defaultValue={value}
            mt={48}
            styles={accordionStyles}
          >
            {faq.map(({ id, title, content }) => (
              <Accordion.Item value={id.toString()} key={id.toString()}>
                <Accordion.Control>{title}</Accordion.Control>
                <Accordion.Panel>{content}</Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>

          <Text
            pt={48}
            sx={{
              color: theme.colors.brand[7],
              fontSize: '18px'
            }}
          >
            Mais informações, sugestões e/ou reclamações, por favor entre em
            contato através do e-mail{' '}
            <Anchor
              href="mailto:contato@encontreduca.com.br"
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
        </SectionContainer>
      </Box>
    </Center>
  )
}
