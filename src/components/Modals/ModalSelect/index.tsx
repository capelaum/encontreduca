import {
  LoadingOverlay,
  Select,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { ContextModalProps } from '@mantine/modals'
import { ConfirmButtons } from 'components/Shared/ConfirmButtons'
import { inputStyles } from 'components/Shared/styles/inputStyles'
import { showToast, showToastError } from 'components/Shared/ToastMessage'
import { createResourceComplaint, createReviewComplaint } from 'lib/complaints'
import { useState } from 'react'
import { IoIosSend } from 'react-icons/io'
import { TbChevronDown } from 'react-icons/tb'
import { ResourceType } from 'types/resources'
import { Review } from 'types/reviews'
import { defaultUser } from 'utils/defaultUser'
import { DefaultCloseButton } from '../../Shared/DefaultCloseButton'

export function ModalSelect({
  context,
  id,
  innerProps
}: ContextModalProps<{
  motives: string[]
  resource?: ResourceType | null
  isReviewComplaint?: boolean
  review?: Review
}>) {
  const { motives, resource, isReviewComplaint, review } = innerProps
  const { closeModal } = context

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const [isLoading, setIsLoading] = useState(false)
  const [motiveId, setMotiveId] = useState<string | null>(null)

  const handleConfirmComplaint = async () => {
    if (!motiveId) {
      showToastError({
        title: 'Por favor, selecione um motivo',
        description: `Precisa-se de um motivo para ${
          isReviewComplaint ? 'denunciar a avaliação.' : 'fechar o recurso.'
        }`
      })

      return
    }

    if ((isReviewComplaint && !review) || (!isReviewComplaint && !resource)) {
      showToastError({
        title: 'Ooops, algo deu errado',
        description: 'Por favor, tente novamente mais tarde.'
      })

      return
    }

    setIsLoading(true)

    if (isReviewComplaint && review) {
      await createReviewComplaint({
        user_id: defaultUser.id,
        review_id: review.id,
        motive_id: motiveId
      })
    }

    if (!isReviewComplaint && resource) {
      await createResourceComplaint({
        user_id: defaultUser.id,
        resource_id: resource.id,
        motive_id: motiveId
      })
    }

    setIsLoading(false)

    closeModal(id)
    showToast({
      title: isReviewComplaint
        ? 'Denúncia de avaliação enviada!'
        : 'Sugestão de alteração enviada!',
      description: 'Agradecemos sua colaboração!',
      icon: <IoIosSend size={24} color={theme.colors.brand[7]} />,
      dark
    })
  }

  return (
    <Stack spacing="md">
      <DefaultCloseButton onClick={() => closeModal(id)} title="Fechar modal" />

      <LoadingOverlay
        visible={isLoading}
        overlayBlur={2}
        overlayOpacity={0.3}
        overlayColor={dark ? theme.black : theme.white}
        sx={{
          svg: { stroke: dark ? theme.colors.cyan[3] : theme.colors.brand[7] }
        }}
      />

      {resource && (
        <Text
          sx={{
            fontWeight: 500,
            color: dark ? theme.colors.gray[2] : theme.colors.gray[6]
          }}
        >
          {resource.name}
        </Text>
      )}

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
        data={motives}
      />

      <ConfirmButtons
        onCancel={() => closeModal(id)}
        onConfirm={() => handleConfirmComplaint()}
        onConfirmText="Enviar"
      />
    </Stack>
  )
}
