import { Text } from '@mantine/core'

export function Author() {
  return (
    <Text
      size="sm"
      sx={(theme) => ({
        color: theme.colors.gray[4]
      })}
    >
      Criado por Nome Completo
    </Text>
  )
}
