import { Group, Text, UnstyledButton } from '@mantine/core'

interface MenuButtonProps {
  text: string
  icon: React.ReactElement
}

export function MenuButton({ text, icon }: MenuButtonProps) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        color: theme.colors.cyan[3],
        textAlign: 'left',
        paddingTop: theme.spacing.sm,
        paddingBottom: theme.spacing.sm,
        paddingRight: theme.spacing.md,
        paddingLeft: theme.spacing.md,
        '&:hover': {
          backgroundColor: theme.colors.brand[5],
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
