import {
  Anchor,
  Center,
  Group,
  Stack,
  Text,
  useMantineTheme
} from '@mantine/core'
import Link from 'next/link'
import { FaGithub, FaLaptopCode } from 'react-icons/fa'
import { NavLink } from '../Header/NavLink'

export function Footer() {
  const theme = useMantineTheme()

  return (
    <Center
      component="footer"
      sx={{
        backgroundColor: theme.colors.brand[7]
      }}
    >
      <Stack
        align="center"
        pt={48}
        spacing={24}
        sx={{
          width: '100%',
          backgroundColor: theme.colors.brand[7],
          zIndex: 3
        }}
      >
        <NavLink
          link="https://luis-capelletto-portfolio.netlify.app"
          target="_blank"
        >
          <Group spacing={12} align="center">
            <FaLaptopCode size={24} color={theme.colors.cyan[3]} />
            <Text>Meu Portfolio</Text>
          </Group>
        </NavLink>

        <NavLink
          link="https://github.com/capelaum/encontreduca"
          target="_blank"
        >
          <Group spacing={12} align="center">
            <FaGithub size={24} color={theme.colors.cyan[3]} />
            <Text>Repositório do projeto no Github</Text>
          </Group>
        </NavLink>

        <Stack spacing={12} align="center" pt={16}>
          <Link href="/termos" passHref>
            <Anchor
              component="a"
              variant="text"
              size="sm"
              sx={{
                color: theme.colors.cyan[3],
                transition: '0.3s ease-out',
                '&:hover': {
                  color: theme.colors.cyan[5]
                }
              }}
              rel="noreferrer"
            >
              Termos de Uso
            </Anchor>
          </Link>

          <Link href="/privacidade" passHref>
            <Anchor
              component="a"
              variant="text"
              size="sm"
              sx={{
                color: theme.colors.cyan[3],
                transition: '0.3s ease-out',
                '&:hover': {
                  color: theme.colors.cyan[5]
                }
              }}
              rel="noreferrer"
            >
              Política de Privacidade
            </Anchor>
          </Link>
        </Stack>

        <Text
          align="center"
          size="sm"
          pt={8}
          sx={{ color: theme.colors.gray[4] }}
        >
          Desenvolvido com 💟 por{' '}
          <NavLink
            isInvertColors
            link="https://github.com/capelaum"
            target="_blank"
          >
            Luís Vinicius Capelletto
          </NavLink>
        </Text>
      </Stack>
    </Center>
  )
}
