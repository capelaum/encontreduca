import {
  Button,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useAuth } from 'contexts/authContext'
import { BsGithub } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'

export function SocialButtons() {
  const { loginWithProvider } = useAuth()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const handleSignInWithGoogle = async () => {
    await loginWithProvider('google')
  }

  const handleSignInWithGithub = async () => {
    await loginWithProvider('github')
  }

  return (
    <Stack spacing="md">
      <Button
        variant="white"
        radius="md"
        color={theme.colors.brand[7]}
        leftIcon={<FcGoogle size={24} />}
        onClick={() => handleSignInWithGoogle()}
        sx={{
          boxShadow: dark ? 'none' : '0 1px 4px rgba(0, 0, 0, 0.4)',
          transition: 'all 0.3s ease-out',
          '&:hover': {
            filter: 'brightness(0.95)'
          }
        }}
      >
        <Text>Entrar com Google</Text>
      </Button>

      <Button
        variant="white"
        radius="md"
        color={theme.colors.brand[7]}
        leftIcon={<BsGithub size={22} />}
        onClick={() => handleSignInWithGithub()}
        sx={{
          boxShadow: dark ? 'none' : '0 1px 4px rgba(0, 0, 0, 0.4)',
          transition: 'all 0.3s ease-out',
          '&:hover': {
            filter: 'brightness(0.95)'
          }
        }}
      >
        <Text>Entrar com Github</Text>
      </Button>
    </Stack>
  )
}
