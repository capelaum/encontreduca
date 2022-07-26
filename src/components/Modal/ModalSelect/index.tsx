import {
  Select,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { ContextModalProps } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { ConfirmButtons } from 'components/Shared/ConfirmButtons'
import { useState } from 'react'
import { IoIosSend } from 'react-icons/io'
import { TbChevronDown } from 'react-icons/tb'
import { inputStyles } from 'styles/inputStyles'
import { notificationStyles } from 'styles/notificationStyles'
import { CloseButton } from '../Shared/CloseButton'

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
      <CloseButton onClick={() => closeModal(id)} />

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
          showNotification({
            title: isReviewComplaint
              ? 'Denúncia de avaliação enviada!'
              : 'Sugestão de alteração enviada!',
            message: isReviewComplaint
              ? 'Agradecemos sua colaboração!'
              : 'Agradecemos sua participação!',
            icon: <IoIosSend size={24} color={theme.colors.brand[8]} />,
            styles: notificationStyles(theme, dark)
          })
        }}
        onConfirmText="Enviar"
      />
    </Stack>
  )
}
