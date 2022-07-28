import {
  Group,
  Stack,
  Text,
  UnstyledButton,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'

interface ModalResourceChangeButtonProps {
  label: string
  description: string
  onClick?: () => void
  icon: React.ReactNode
}

export function ModalResourceChangeButton({
  label,
  description,
  onClick,
  icon
}: ModalResourceChangeButtonProps) {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <UnstyledButton
      onClick={onClick}
      sx={{
        '&:hover': {
          backgroundColor: dark ? 'rgba(0, 0, 0, 0.1)' : theme.colors.gray[1]
        }
      }}
    >
      <Group align="center" spacing={32} px={20} py={12} noWrap>
        {icon}

        <Stack spacing={2}>
          <Text
            size="sm"
            sx={{
              color: dark ? theme.colors.cyan[3] : theme.colors.brand[7]
            }}
          >
            {label}
          </Text>
          <Text
            size="xs"
            sx={{
              color: dark ? theme.colors.gray[4] : theme.colors.gray[6]
            }}
          >
            {description}
          </Text>
        </Stack>
      </Group>
    </UnstyledButton>
  )
}
