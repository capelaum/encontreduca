import {
  Button,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useState } from 'react'
import { BsGithub } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'

export function SocialButtons() {
  const [isLoading, setIsLoading] = useState(false)

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const handleSignInWithGoogle = async () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  const handleSignInWithGithub = async () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  return (
    <Stack spacing="md">
      <Button
        loading={isLoading}
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
        loading={isLoading}
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