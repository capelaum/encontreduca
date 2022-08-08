import {
  Avatar,
  Box,
  Group,
  MantineColor,
  MantineTheme,
  SelectItemProps,
  Text
} from '@mantine/core'
import { forwardRef } from 'react'

interface ItemProps extends SelectItemProps {
  color: MantineColor
  address: string
  cover: string
  theme: MantineTheme
  dark: boolean
  isMap: boolean
  largeScreen: boolean
}

export const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  (
    {
      address,
      value,
      cover,
      theme,
      dark,
      isMap,
      largeScreen,
      ...others
    }: ItemProps,
    ref
  ) => (
    <Box ref={ref} {...others} p={0}>
      <Group noWrap spacing={12} p={8}>
        <Avatar src={cover} alt={value} radius="md" size="lg" />

        <Box>
          <Text color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}>
            {value}
          </Text>
          <Text size="xs" color="dimmed">
            {address}
          </Text>
        </Box>
      </Group>
    </Box>
  )
)
