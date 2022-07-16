import { Divider, Stack } from '@mantine/core'
import { myTheme } from 'styles/theme'
import { CloseButton } from '../Shared/CloseButton'
import { ResourceChange } from './ModalButtons/ResourceChange'
import { ResourceClose } from './ModalButtons/ResourceClose'

interface ModalResourceChangeProps {
  onClose: () => void
}

export function ModalResourceChange({ onClose }: ModalResourceChangeProps) {
  return (
    <Stack spacing={0} pb={20}>
      <CloseButton onClick={onClose} />

      <Divider size="xs" color={myTheme.colors!.brand![0]} variant="dotted" />

      <ResourceChange onClose={onClose} />

      <Divider size="xs" color={myTheme.colors!.brand![0]} variant="dotted" />

      <ResourceClose />

      <Divider size="xs" color={myTheme.colors!.brand![0]} variant="dotted" />
    </Stack>
  )
}
