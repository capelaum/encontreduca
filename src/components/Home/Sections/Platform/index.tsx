import { Box, Center, Group, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import platform from '@public/images/Home/platform.svg'
import Image from 'next/image'
import { Description } from './Description'

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
        <Description />
      </Group>
    </Center>
  )
}
