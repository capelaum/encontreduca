import { Text, useMantineColorScheme } from '@mantine/core'
import { useResource } from 'contexts/resourceContext'

export function Author() {
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { resource } = useResource()

  const author = resource?.user.name

  return (
    <Text
      size="sm"
      sx={(theme) => ({
        fontWeight: 500,
        color: dark ? theme.colors.gray[4] : theme.colors.gray[7]
      })}
    >
      Criado por {author}
    </Text>
  )
}
