import {
  Divider,
  Stack,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useResource } from 'contexts/resourceContext'
import { MdLocalPhone, MdPlace } from 'react-icons/md'
import { TbWorld } from 'react-icons/tb'
import { InfoItem } from './InfoItem'

export function Info() {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { resource } = useResource()
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
        <InfoItem
          icon={
            <MdPlace
              size={24}
              color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}
            />
          }
          text={address}
        />

        {website && (
          <InfoItem
            icon={
              <TbWorld
                size={24}
                color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}
              />
            }
            text={website}
          />
        )}

        {phone && (
          <InfoItem
            icon={
              <MdLocalPhone
                size={24}
                color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}
              />
            }
            text={phone}
          />
        )}
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
