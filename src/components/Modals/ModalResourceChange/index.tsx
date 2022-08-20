import {
  Divider,
  Stack,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { DefaultCloseButton } from '../../Shared/Default/DefaultCloseButton'
import { ResourceChange } from './ModalButtons/ResourceChange'
import { ResourceClose } from './ModalButtons/ResourceClose'

interface ModalResourceChangeProps {
  onClose: () => void
}

export function ModalResourceChange({ onClose }: ModalResourceChangeProps) {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <Stack
      spacing={0}
      pb={20}
      sx={{
        borderRadius: theme.radius.md,
        color: dark ? theme.colors.cyan[3] : theme.colors.brand[7],
        backgroundColor: dark ? theme.colors.brand[7] : theme.colors.gray[0]
      }}
    >
      <DefaultCloseButton onClick={onClose} title="Fechar modal" />

      <Divider
        size="xs"
        color={dark ? theme.colors.cyan[3] : theme.colors.gray[6]}
        variant="dotted"
      />

      <ResourceChange onClose={onClose} />

      <Divider
        size="xs"
        color={dark ? theme.colors.cyan[3] : theme.colors.gray[6]}
        variant="dotted"
      />

      <ResourceClose onClose={onClose} />

      <Divider
        size="xs"
        color={dark ? theme.colors.cyan[3] : theme.colors.gray[6]}
        variant="dotted"
      />
    </Stack>
  )
}
