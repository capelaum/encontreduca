import { Group, Text, useMantineTheme } from '@mantine/core'
import { ReactNode } from 'react'

interface InfoItemProps {
  icon: ReactNode
  text: string | null
}

export function InfoItem({ icon, text }: InfoItemProps) {
  const theme = useMantineTheme()

  return (
    <Group spacing={16} align="center" noWrap>
      {icon}
      <Text
        size="sm"
        sx={{
          color: theme.white,
          maxWidth: '320px',
          fontWeight: 400,
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}
      >
        {text}
      </Text>
    </Group>
  )
}
