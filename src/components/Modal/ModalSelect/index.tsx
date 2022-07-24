import {
  Select,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { ContextModalProps } from '@mantine/modals'
import { ConfirmButtons } from 'components/Shared/ConfirmButtons'
import { useState } from 'react'
import { TbChevronDown } from 'react-icons/tb'
import { inputStyles } from 'styles/inputStyles'
import { myTheme } from 'styles/theme'
import { CloseButton } from '../Shared/CloseButton'

export function ModalSelect({
  context,
  id,
  innerProps
}: ContextModalProps<{ data: string[]; resourceName: string }>) {
  const { data, resourceName } = innerProps

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const [motiveId, setMotiveId] = useState<string | null>()

  return (
    <Stack spacing="md">
      <CloseButton onClick={() => context.closeModal(id)} />

      <Text
        sx={{
          color: theme.colors.gray[2]
        }}
      >
        {resourceName}
      </Text>
      <Select
        label="Motivo"
        required
        size="sm"
        placeholder="Selecione um motivo"
        value={motiveId}
        variant="filled"
        onChange={setMotiveId}
        sx={inputStyles(theme, dark)}
        maxDropdownHeight={300}
        rightSection={
          <TbChevronDown size={14} color={myTheme.colors!.brand![0]} />
        }
        rightSectionWidth={30}
        data={data}
      />

      <ConfirmButtons
        onCancel={() => context.closeModal(id)}
        onConfirm={() => context.closeModal(id)}
        onConfirmText="Enviar"
      />
    </Stack>
  )
}
