import {
  LoadingOverlay,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'

interface DefaultOverlayProps {
  visible: boolean
}

export function DefaultOverlay({ visible }: DefaultOverlayProps) {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <LoadingOverlay
      visible={visible}
      overlayBlur={2}
      overlayOpacity={0.3}
      overlayColor={dark ? theme.black : theme.white}
      sx={{
        svg: { stroke: dark ? theme.colors.cyan[3] : theme.colors.brand[7] }
      }}
    />
  )
}
