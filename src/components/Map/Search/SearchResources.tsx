import {
  Box,
  TextInput,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { MdSearch } from 'react-icons/md'

export function SearchResources() {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <TextInput
      size="md"
      radius="md"
      type="search"
      variant="filled"
      id="search-resource"
      placeholder="Busque um recurso"
      aria-label="Busque recursos educacionais"
      rightSectionWidth={40}
      rightSection={
        <Tooltip
          multiline
          label="Busque os recursos educacionais por nome"
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
      }
      sx={{
        width: '420px',
        flex: 1,
        input: {
          color: dark ? theme.colors.dark[0] : theme.colors.brand[7],
          backgroundColor: dark ? theme.colors.brand[7] : theme.colors.gray[0]
        },
        'input:focus': {
          outline: 'none',
          border: 'none'
        }
      }}
    />
  )
}
