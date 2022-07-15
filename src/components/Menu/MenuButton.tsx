import { Group, Text, UnstyledButton } from '@mantine/core'

interface MenuButtonProps {
  text: string
  icon: React.ReactElement
  onClick?: () => void
}

export function MenuButton({ text, icon, onClick }: MenuButtonProps) {
  return (
    <UnstyledButton
      onClick={onClick}
      sx={(theme) => ({
        color: theme.colors.cyan[3],
        textAlign: 'left',
        paddingTop: 14,
        paddingBottom: 14,
        paddingRight: theme.spacing.md,
        paddingLeft: theme.spacing.md,
        '&:hover': {
          backgroundColor: theme.colors.brand[0],
          color: theme.colors.brand[7]
        }
      })}
    >
      <Group spacing="md" align="center">
        {icon}
        <Text size="lg" weight={400}>
          {text}
        </Text>
      </Group>
    </UnstyledButton>
  )
}
