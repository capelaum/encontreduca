import { Text, useMantineColorScheme } from '@mantine/core'

export function Author() {
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <Text
      size="sm"
      sx={(theme) => ({
        fontWeight: 500,
        color: dark ? theme.colors.gray[4] : theme.colors.gray[7]
      })}
    >
      Criado por Nome Completo
    </Text>
  )
}
