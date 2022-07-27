import {
  Select,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { ContextModalProps } from '@mantine/modals'
import { ConfirmButtons } from 'components/Shared/ConfirmButtons'
import { inputStyles } from 'components/Shared/styles/inputStyles'
import { showToast } from 'components/Shared/ToastMessage'
import { useState } from 'react'
import { IoIosSend } from 'react-icons/io'
import { TbChevronDown } from 'react-icons/tb'
import { DefaultCloseButton } from '../../Shared/DefaultCloseButton'

export function ModalSelect({
  context,
  id,
  innerProps
}: ContextModalProps<{
  data: string[]
  resourceName: string
  isReviewComplaint?: boolean
}>) {
  const { data, resourceName, isReviewComplaint } = innerProps
  const { closeModal } = context

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const [motiveId, setMotiveId] = useState<string | null>()

  return (
    <Stack spacing="md">
      <DefaultCloseButton onClick={() => closeModal(id)} title="Fechar modal" />

      <Text
        sx={{
          fontWeight: 500,
          color: dark ? theme.colors.gray[2] : theme.colors.gray[6]
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
          <TbChevronDown
            size={14}
            color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}
          />
        }
        rightSectionWidth={30}
        data={data}
      />

      <ConfirmButtons
        onCancel={() => closeModal(id)}
        onConfirm={() => {
          closeModal(id)
          showToast({
            title: isReviewComplaint
              ? 'Denúncia de avaliação enviada!'
              : 'Sugestão de alteração enviada!',
            description: isReviewComplaint
              ? 'Agradecemos sua colaboração!'
              : 'Agradecemos sua participação!',
            icon: <IoIosSend size={24} color={theme.colors.brand[7]} />,
            dark
          })
        }}
        onConfirmText="Enviar"
      />
    </Stack>
  )
}
