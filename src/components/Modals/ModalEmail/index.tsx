import {
  Box,
  Image,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { DefaultCloseButton } from 'components/Shared/Default/DefaultCloseButton'

interface ModalEmailProps {
  onClose: () => void
  title: string
  text: string
  image: {
    src: string
    alt: string
  }
}

export function ModalEmail({ onClose, title, text, image }: ModalEmailProps) {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <Stack spacing="md" align="center">
      <DefaultCloseButton onClick={onClose} title="Fechar Modal" />

      <Box mt={32}>
        <Image src={image.src} alt={image.alt} width={120} />
      </Box>

      <Text
        size="lg"
        weight={500}
        align="center"
        color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}
      >
        {title}
      </Text>

      <Text align="center">{text}</Text>
    </Stack>
  )
}
