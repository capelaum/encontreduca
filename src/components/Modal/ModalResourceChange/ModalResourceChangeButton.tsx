import { Group, Stack, Text, UnstyledButton } from '@mantine/core'

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
  return (
    <UnstyledButton
      onClick={onClick}
      sx={{
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.1)'
        }
      }}
    >
      <Group align="center" spacing={32} px={20} py={12} noWrap>
        {icon}

        <Stack spacing={2}>
          <Text
            size="sm"
            sx={(theme) => ({
              color: theme.colors.brand[0]
            })}
          >
            {label}
          </Text>
          <Text
            size="xs"
            sx={(theme) => ({
              color: theme.colors.gray[4]
            })}
          >
            {description}
          </Text>
        </Stack>
      </Group>
    </UnstyledButton>
  )
}
