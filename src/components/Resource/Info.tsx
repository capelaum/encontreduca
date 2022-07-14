import { Group, Stack, Text } from '@mantine/core'
import { MdLocalPhone, MdPlace } from 'react-icons/md'
import { TbWorld } from 'react-icons/tb'
import { myTheme } from 'styles/theme'

interface InfoProps {
  address: string
  website: string | null
  phone: string | null
}

export function Info({ address, website, phone }: InfoProps) {
  return (
    <Stack px="md" spacing="md">
      <Group spacing={16} align="center">
        <MdPlace size={24} color={myTheme.colors!.brand![0]} />
        <Text size="sm" sx={{ maxWidth: '320px' }}>
          {address}
        </Text>
      </Group>

      <Group spacing={16} align="center">
        <TbWorld size={24} color={myTheme.colors!.brand![0]} />
        <Text size="sm" sx={{ maxWidth: '320px' }}>
          {website}
        </Text>
      </Group>

      <Group spacing={16} align="center">
        <MdLocalPhone size={24} color={myTheme.colors!.brand![0]} />
        <Text size="sm" sx={{ maxWidth: '320px' }}>
          {phone}
        </Text>
      </Group>
    </Stack>
  )
}
