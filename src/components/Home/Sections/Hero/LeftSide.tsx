import { Stack, Text, Title, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { ButtonsCTA } from './ButtonsCTA'

export function LeftSide() {
  const largeScreen = useMediaQuery('(min-width: 992px)', false)
  const smallScreen = useMediaQuery('(max-width: 480px)', false)

  const theme = useMantineTheme()

  return (
    <Stack
      pb={largeScreen ? 0 : 64}
      align={largeScreen ? 'apart' : 'center'}
      spacing={largeScreen ? 8 : 24}
      sx={{
        width: largeScreen ? '40%' : 'auto',
        maxWidth: smallScreen ? '100%' : '80%'
      }}
    >
      <Title
        order={1}
        align={largeScreen ? 'left' : 'center'}
        sx={{
          fontSize: smallScreen ? '40px' : '56px'
        }}
      >
        Encontr
        <Text
          color={theme.white}
          sx={{ display: 'inline-block', paddingLeft: '2px' }}
        >
          educa
        </Text>
      </Title>
      <Text
        align={largeScreen ? 'left' : 'center'}
        sx={{
          fontSize: smallScreen ? '20px' : '28px'
        }}
        color={theme.white}
      >
        Encontre os recursos educacionais <wbr /> mais próximos de você!
      </Text>

      <ButtonsCTA />
    </Stack>
  )
}
