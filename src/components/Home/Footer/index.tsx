import { Center, Group, Stack, Text, useMantineTheme } from '@mantine/core'
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

        <Text
          align="center"
          size="sm"
          pt={24}
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
