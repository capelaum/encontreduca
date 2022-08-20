import {
  Box,
  Divider,
  Stack,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useResource } from 'contexts/resourceContext'
import Link from 'next/link'
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
        mt="md"
        size="xs"
        color="none"
        sx={{ color: dark ? theme.colors.gray[6] : theme.colors.gray[4] }}
      />
      <Stack spacing={0}>
        <InfoItem
          type="address"
          text={address}
          icon={
            <MdPlace
              size={24}
              color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}
            />
          }
        />

        {website && (
          <Link href={website} passHref>
            <Box component="a" target="_blank" sx={{ textDecoration: 'none' }}>
              <InfoItem
                type="website"
                text={website}
                icon={
                  <TbWorld
                    size={24}
                    color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}
                  />
                }
              />
            </Box>
          </Link>
        )}

        {phone && (
          <InfoItem
            type="phone"
            text={phone}
            icon={
              <MdLocalPhone
                size={24}
                color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}
              />
            }
          />
        )}
      </Stack>

      <Divider
        mb="md"
        size="xs"
        color="none"
        sx={{ color: dark ? theme.colors.gray[6] : theme.colors.gray[4] }}
      />
    </>
  )
}
