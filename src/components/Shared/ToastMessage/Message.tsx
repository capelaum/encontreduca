import { Box, Group, Text } from '@mantine/core'
import { ReactNode } from 'react'

export function Message({
  title,
  description,
  icon
}: {
  title: string
  description: string
  icon: ReactNode
}) {
  return (
    <Group align="center" spacing={12} noWrap>
      {icon}
      <Box>
        <Text size="md" weight={500}>
          {title}
        </Text>
        <Text size="sm">{description}</Text>
      </Box>
    </Group>
  )
}
