import { Avatar, useMantineColorScheme, useMantineTheme } from '@mantine/core'

interface DefaultAvatarProps {
  size: number
  avatarSrc?: string | null
}

export function DefaultAvatar({ size, avatarSrc }: DefaultAvatarProps) {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <Avatar
      src={avatarSrc}
      radius={200}
      size={size}
      sx={{
        color: dark ? theme.colors.cyan[3] : theme.colors.brand[7],
        backgroundColor: dark ? theme.colors.gray[6] : theme.colors.gray[4]
      }}
    />
  )
}
