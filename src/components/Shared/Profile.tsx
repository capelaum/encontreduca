import {
  Avatar,
  Box,
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
          <Group spacing={4} align="center">
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
              multiline
              label="Suas postagens vão aparecer publicamente com seu nome e foto do perfil."
              position="bottom-start"
              transition="pop-bottom-left"
              radius={theme.radius.md}
              width={200}
              withArrow
              arrowSize={6}
              p={8}
              offset={-2}
              sx={{
                color: theme.colors.brand[7],
                backgroundColor: theme.colors.cyan[3],
                borderRadius: theme.radius.md
              }}
            >
              <Box>
                <MdInfoOutline
                  size={14}
                  color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}
                />
              </Box>
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
