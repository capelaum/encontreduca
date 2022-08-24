import {
  ActionIcon,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'

interface ActionButtonProps {
  icon: React.ReactElement
  text: string
  onClick?: () => void
  isLoading?: boolean
}

export function ActionButton({
  text,
  icon,
  onClick,
  isLoading
}: ActionButtonProps) {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <Stack
      spacing="sm"
      align="center"
      justify="start"
      sx={{ maxWidth: '72px' }}
    >
      <ActionIcon
        onClick={onClick}
        variant="outline"
        size="xl"
        loading={isLoading}
        title={text}
        radius="md"
        sx={{
          color: dark ? theme.colors.cyan[3] : theme.colors.brand[7],
          border: `1px solid${
            dark ? theme.colors.cyan[3] : theme.colors.brand[7]
          }`,
          '&[data-loading]': {
            '&::before': {
              backgroundColor: dark
                ? 'rgba(0, 0, 0, 0.5)'
                : 'rgba(255, 255, 255, 0.5)'
            },
            svg: {
              zIndex: 3,
              stroke: theme.colors.cyan[3]
            }
          }
        }}
      >
        {icon}
      </ActionIcon>
      <Text
        size="sm"
        align="center"
        sx={{
          fontWeight: 600,
          color: dark ? theme.white : theme.colors.brand[7]
        }}
      >
        {text}
      </Text>
    </Stack>
  )
}
