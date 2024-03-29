import {
  Group,
  Stack,
  Text,
  UnstyledButton,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { DefaultAvatar } from 'components/Shared/Default/DefaultAvatar'
import { useAuth } from 'contexts/authContext'

interface MenuProfileProps {
  setProfileOpened: (opened: boolean) => void
}

export function MenuProfile({ setProfileOpened }: MenuProfileProps) {
  const { user } = useAuth()

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
      {user && (
        <Group spacing={12} noWrap>
          <DefaultAvatar size={50} avatarSrc={user.avatarUrl} />

          <Stack spacing={2}>
            <Text
              size="md"
              weight={500}
              sx={{
                color: dark ? theme.colors.cyan[3] : theme.colors.brand[7],
                paddingRight: '32px'
              }}
            >
              {user.name}
            </Text>
            <Text
              size="md"
              sx={{ color: dark ? theme.colors.gray[3] : theme.colors.gray[6] }}
            >
              {user.email}
            </Text>
          </Stack>
        </Group>
      )}
    </UnstyledButton>
  )
}
