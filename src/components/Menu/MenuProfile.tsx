import {
  Avatar,
  Group,
  Stack,
  Text,
  UnstyledButton,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'

interface MenuProfileProps {
  setProfileOpened: (opened: boolean) => void
}

export function MenuProfile({ setProfileOpened }: MenuProfileProps) {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <UnstyledButton
      onClick={() => setProfileOpened(true)}
      sx={{
        margin: theme.spacing.md
      }}
    >
      <Group spacing={12} noWrap>
        <Avatar radius="xl" size={50} />

        <Stack spacing={2}>
          <Text
            size="md"
            weight={500}
            sx={{
              color: dark ? theme.colors.cyan[3] : theme.colors.brand[7],
              paddingRight: '32px'
            }}
          >
            Luís Vinicius Capelletto
          </Text>
          <Text
            size="md"
            sx={{ color: dark ? theme.colors.gray[3] : theme.colors.gray[6] }}
          >
            user@gmail.com
          </Text>
        </Stack>
      </Group>
    </UnstyledButton>
  )
}
