import {
  Anchor,
  Box,
  Divider,
  Group,
  Text,
  useMantineTheme
} from '@mantine/core'
import { MdMail } from 'react-icons/md'

export function Copy() {
  const year = new Date().getFullYear()

  const theme = useMantineTheme()

  return (
    <Box pt={48} pb={56}>
      <Divider pb={24} />
      <Box pl={12}>
        <Group spacing={8} pb={12}>
          <MdMail size={16} />
          <Anchor
            href="mailto:contato@encontreduca.com.br"
            sx={{
              color: theme.colors.cyan[3],
              transition: '0.3s ease-out',
              '&:hover': {
                color: theme.colors.cyan[5],
                textDecoration: 'none'
              }
            }}
          >
            contato@encontreduca.com.br
          </Anchor>
        </Group>
        <Text size="sm">&copy; Encontreduca {year}</Text>
        <Text size="sm">Todos os direitos reservados.</Text>
      </Box>
    </Box>
  )
}
