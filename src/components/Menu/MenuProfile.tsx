import { Avatar, Group, Stack, Text, UnstyledButton } from '@mantine/core'

interface MenuProfileProps {
  setProfileOpened: (opened: boolean) => void
}

export function MenuProfile({ setProfileOpened }: MenuProfileProps) {
  return (
    <UnstyledButton
      onClick={() => setProfileOpened(true)}
      sx={(theme) => ({
        margin: theme.spacing.md
      })}
    >
      <Group spacing={12}>
        <Avatar radius="xl" size={50} src="/avatar.png" />
        <Stack spacing={2}>
          <Text
            size="xl"
            weight={500}
            sx={(theme) => ({ color: theme.colors.cyan[3] })}
          >
            Nome Completo
          </Text>
          <Text size="md" sx={(theme) => ({ color: theme.colors.gray[3] })}>
            user@gmail.com
          </Text>
        </Stack>
      </Group>
    </UnstyledButton>
  )
}
