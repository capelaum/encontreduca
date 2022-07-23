import {
  Divider,
  Group,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useSidebar } from 'contexts/sidebarContext'
import { MdLocalPhone, MdPlace } from 'react-icons/md'
import { TbWorld } from 'react-icons/tb'

export function Info() {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { resource } = useSidebar()
  const { address, website, phone } = resource!

  return (
    <>
      <Divider
        my="md"
        size="xs"
        color="none"
        sx={{ color: dark ? theme.colors.gray[6] : theme.colors.gray[4] }}
      />
      <Stack px="md" spacing="md">
        <Group spacing={16} align="center" noWrap>
          <MdPlace
            size={24}
            color={dark ? theme.colors.cyan[3] : theme.colors.brand[9]}
          />
          <Text size="sm" sx={{ maxWidth: '320px', fontWeight: 600 }}>
            {address}
          </Text>
        </Group>

        <Group spacing={16} align="center">
          <TbWorld
            size={24}
            color={dark ? theme.colors.cyan[3] : theme.colors.brand[9]}
          />
          <Text size="sm" sx={{ maxWidth: '320px', fontWeight: 600 }}>
            {website}
          </Text>
        </Group>

        <Group spacing={16} align="center">
          <MdLocalPhone
            size={24}
            color={dark ? theme.colors.cyan[3] : theme.colors.brand[9]}
          />
          <Text size="sm" sx={{ maxWidth: '320px', fontWeight: 600 }}>
            {phone}
          </Text>
        </Group>
      </Stack>

      <Divider
        my="md"
        size="xs"
        color="none"
        sx={{ color: dark ? theme.colors.gray[6] : theme.colors.gray[4] }}
      />
    </>
  )
}
