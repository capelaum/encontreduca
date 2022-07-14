import { Divider, Group, Stack, Text } from '@mantine/core'
import { useSidebar } from 'contexts/sidebarContext'
import { MdLocalPhone, MdPlace } from 'react-icons/md'
import { TbWorld } from 'react-icons/tb'
import { myTheme } from 'styles/theme'

export function Info() {
  const { resource } = useSidebar()
  const { address, website, phone } = resource!

  return (
    <>
      <Divider
        my="md"
        size="xs"
        color="none"
        sx={(theme) => ({ color: theme.colors.gray[6] })}
      />
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

      <Divider
        my="md"
        size="xs"
        color="none"
        sx={(theme) => ({ color: theme.colors.gray[6] })}
      />
    </>
  )
}
