import {
  Box,
  Group,
  Stack,
  Text,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { MdInfoOutline } from 'react-icons/md'
import { DefaultAvatar } from './Default/DefaultAvatar'

interface ProfileProps {
  isModal?: boolean
  author: string
  authorAvatar: string | null
  authorReviewCount?: number
}

export function Profile({
  isModal,
  author,
  authorAvatar,
  authorReviewCount
}: ProfileProps) {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const renderModalReviewTooltip = () => (
    <Group spacing={4} align="center">
      <Text
        size="xs"
        sx={{
          color: dark ? theme.colors.gray[3] : theme.colors.gray[7],
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
          color: theme.colors.gray[7],
          backgroundColor: theme.colors.cyan[3],
          borderRadius: theme.radius.md
        }}
      >
        <Box>
          <MdInfoOutline
            size={14}
            color={dark ? theme.colors.gray[3] : theme.colors.gray[7]}
          />
        </Box>
      </Tooltip>
    </Group>
  )

  const renderReviewCount = () => {
    if (authorReviewCount === 0) return 'Sem avaliações'
    if (authorReviewCount === 1) return '1 avaliação'
    return `${authorReviewCount} avaliações`
  }

  return (
    <Group spacing="sm" align="center">
      <DefaultAvatar size={35} avatarSrc={authorAvatar} />

      <Stack spacing={0}>
        <Text
          size="sm"
          weight={500}
          sx={{
            color: dark ? theme.colors.cyan[3] : theme.colors.brand[7]
          }}
        >
          {author}
        </Text>

        {isModal ? (
          renderModalReviewTooltip()
        ) : (
          <Text
            size="xs"
            sx={{
              color: dark ? theme.colors.gray[3] : theme.colors.brand[7],
              lineHeight: 1.5
            }}
          >
            {renderReviewCount()}
          </Text>
        )}
      </Stack>
    </Group>
  )
}
