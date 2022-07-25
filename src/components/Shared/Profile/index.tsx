import {
  Avatar,
  Group,
  Stack,
  Text,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { MdInfoOutline } from 'react-icons/md'

interface ProfileProps {
  isModal?: boolean
}

export function Profile({ isModal }: ProfileProps) {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <Group spacing="sm" align="center">
      <Avatar radius="xl" size={35} src="/avatar.svg" />

      <Stack spacing={0}>
        <Text
          size="sm"
          weight={500}
          sx={{
            color: dark ? theme.colors.cyan[3] : theme.colors.brand[7]
          }}
        >
          Nome Completo
        </Text>

        {isModal ? (
          <Group spacing={4}>
            <Text
              size="xs"
              sx={{
                color: dark ? theme.colors.cyan[3] : theme.colors.brand[7],
                lineHeight: 1.5
              }}
            >
              Postar publicamente
            </Text>
            <Tooltip
              wrapLines
              withArrow
              width={200}
              position="top"
              placement="start"
              transition="pop"
              color={dark ? 'cyan' : 'gray'}
              transitionDuration={200}
              label="Suas postagens vão aparecer publicamente com seu nome e foto do perfil."
            >
              <MdInfoOutline
                size={14}
                color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}
              />
            </Tooltip>
          </Group>
        ) : (
          <Text
            size="xs"
            sx={{
              color: dark ? theme.colors.cyan[3] : theme.colors.brand[7],
              lineHeight: 1.5
            }}
          >
            10 avaliações
          </Text>
        )}
      </Stack>
    </Group>
  )
}
