import { Box, Text } from '@mantine/core'

export function Copy() {
  const year = new Date().getFullYear()

  return (
    <Box sx={{ position: 'absolute', bottom: 0, left: '8px' }}>
      <Text size="sm">&copy; Encontreduca {year}</Text>
      <Text size="sm">Todos os direitos reservados.</Text>
    </Box>
  )
}
