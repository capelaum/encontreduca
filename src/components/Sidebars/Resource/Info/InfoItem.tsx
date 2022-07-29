import {
  Group,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { ReactNode } from 'react'

interface InfoItemProps {
  icon: ReactNode
  text: string | null
}

export function InfoItem({ icon, text }: InfoItemProps) {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <Group spacing={16} align="center" noWrap>
      {icon}
      <Text
        size="sm"
        sx={{
          color: dark ? theme.white : theme.colors.brand[7],
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
