import { Select, Stack, Text } from '@mantine/core'
import { ContextModalProps } from '@mantine/modals'
import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { myTheme } from 'styles/theme'
import { Buttons } from '../Shared/Buttons'
import { CloseButton } from '../Shared/CloseButton'
import styles from './styles.module.scss'

export function ModalSelect({
  context,
  id,
  innerProps
}: ContextModalProps<{ data: string[]; resourceName: string }>) {
  const { data, resourceName } = innerProps
  const [motive, setMotive] = useState<string | null>(null)

  return (
    <Stack spacing="md">
      <CloseButton onClick={() => context.closeModal(id)} />

      <Text
        sx={(theme) => ({
          color: theme.colors.gray[2]
        })}
      >
        {resourceName}
      </Text>
      <Select
        label="Motivo"
        required
        size="sm"
        placeholder="Selectione um motivo"
        value={motive}
        variant="filled"
        onChange={setMotive}
        className={styles.select}
        maxDropdownHeight={300}
        rightSection={
          <FaChevronDown size={16} color={myTheme.colors!.brand![0]} />
        }
        rightSectionWidth={30}
        data={data}
      />

      <Buttons
        onCancel={() => context.closeModal(id)}
        onConfirm={() => context.closeModal(id)}
        onConfirmText="Enviar"
      />
    </Stack>
  )
}
