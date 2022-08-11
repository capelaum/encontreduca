import { Button, Stack, Text, useMantineTheme } from '@mantine/core'
import { useState } from 'react'
import { BsGithub } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'

export function SocialButtons() {
  const [isLoading, setIsLoading] = useState(false)

  const theme = useMantineTheme()

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
      >
        <Text>Entrar com Github</Text>
      </Button>
    </Stack>
  )
}
