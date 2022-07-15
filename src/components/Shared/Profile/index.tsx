import { Avatar, Group, Stack, Text, Tooltip } from '@mantine/core'
import { MdInfoOutline } from 'react-icons/md'
import { myTheme } from 'styles/theme'

interface ProfileProps {
  isModal?: boolean
}

export function Profile({ isModal }: ProfileProps) {
  return (
    <Group spacing="sm" align="center">
      <Avatar radius="xl" size={35} src="/avatar.png" />

      <Stack spacing={0}>
        <Text
          size="sm"
          weight={500}
          sx={(theme) => ({
            color: theme.colors.cyan[3]
          })}
        >
          Nome Completo
        </Text>

        {isModal ? (
          <Group spacing={4}>
            <Text
              size="xs"
              sx={(theme) => ({
                color: theme.colors.gray[3],
                lineHeight: 1.5
              })}
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
              transitionDuration={200}
              color={myTheme.colors!.brand![0]}
              label="Suas postagens vão aparecer publicamente com seu nome e foto do perfil."
            >
              <MdInfoOutline
                size={14}
                color={myTheme.colors!.brand![0]}
                style={{ display: 'block', position: 'relative' }}
              />
            </Tooltip>
          </Group>
        ) : (
          <Text
            size="xs"
            sx={(theme) => ({
              color: theme.colors.gray[3],
              lineHeight: 1.5
            })}
          >
            10 avaliações
          </Text>
        )}
      </Stack>
    </Group>
  )
}
