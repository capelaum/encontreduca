import {
  Box,
  Center,
  CloseButton,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { MdSearch } from 'react-icons/md'

interface SearchRightSectionProps {
  value: string
  setValue: (value: string) => void
  label: string
}

export function SearchRightSection({
  value,
  setValue,
  label
}: SearchRightSectionProps) {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  if (value !== '') {
    return (
      <Center>
        <CloseButton
          onClick={() => setValue('')}
          title="Limpar busca"
          aria-label="Limpar busca"
          iconSize={24}
          size="md"
          radius="md"
          sx={{
            color: dark ? theme.colors.cyan[3] : theme.colors.brand[7],
            backgroundColor: dark
              ? theme.colors.brand[7]
              : theme.colors.gray[0],
            '&:hover': {
              backgroundColor: dark
                ? theme.colors.brand[8]
                : theme.colors.gray[1]
            }
          }}
        />
      </Center>
    )
  }

  return (
    <Tooltip
      multiline
      label={label}
      position="bottom-end"
      transition="pop-bottom-right"
      radius={theme.radius.md}
      width={170}
      withArrow
      arrowSize={6}
      px={8}
      offset={-2}
      sx={{
        color: theme.colors.brand[7],
        backgroundColor: theme.colors.cyan[3],
        borderRadius: theme.radius.md
      }}
    >
      <Box>
        <MdSearch
          size={28}
          color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}
          style={{
            display: 'block',
            position: 'relative'
          }}
        />
      </Box>
    </Tooltip>
  )
}
