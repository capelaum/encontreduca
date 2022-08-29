import {
  Group,
  Stack,
  Textarea,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { ContextModalProps } from '@mantine/modals'
import { ConfirmButtons } from 'components/Shared/ConfirmButtons'
import { DefaultCloseButton } from 'components/Shared/Default/DefaultCloseButton'
import { DefaultOverlay } from 'components/Shared/Default/DefaultOverlay'
import { showToast, showToastError } from 'components/Shared/ToastMessage'
import { ActionButton } from 'components/Sidebars/SidebarResource/ActionButtons/Actions/ActionButton'
import { useAuth } from 'contexts/authContext'
import { useResource } from 'contexts/resourceContext'
import { createResourceVote, updateResourceVote } from 'lib/resourcesLib'
import { getAuthUser } from 'lib/usersLib'
import { useEffect, useState } from 'react'
import {
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp
} from 'react-icons/fa'
import { textareaStyles } from 'styles/inputStyles'

type Vote = 'Aprovado' | 'Reprovado' | null

export function ModalVote({
  context,
  id,
  innerProps
}: ContextModalProps<{ onConfirmText: string }>) {
  const { onConfirmText } = innerProps
  const { closeModal } = context

  const { resource, userResourceVote } = useResource()
  const { setUser } = useAuth()

  const [isLoading, setIsLoading] = useState(false)
  const [justification, setJustification] = useState(
    userResourceVote ? userResourceVote.justification : ''
  )
  const [vote, setVote] = useState<Vote>(null)

  useEffect(() => {
    if (userResourceVote) {
      setVote(userResourceVote.vote ? 'Aprovado' : 'Reprovado')
    }
  }, [])

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const setVoteIcon = (isThumbsUp: boolean) => {
    switch (vote) {
      case 'Aprovado':
        return isThumbsUp ? (
          <FaThumbsUp size={28} />
        ) : (
          <FaRegThumbsDown size={28} />
        )
      case 'Reprovado':
        return isThumbsUp ? (
          <FaRegThumbsUp size={28} />
        ) : (
          <FaThumbsDown size={28} />
        )
      default:
        return isThumbsUp ? (
          <FaRegThumbsUp size={28} />
        ) : (
          <FaRegThumbsDown size={28} />
        )
    }
  }

  const handleOnConfirm = async () => {
    if (!vote || !justification || justification.trim().length < 3) {
      showToastError({
        title: 'Voto e justificativa são obrigatórios',
        description:
          'Para votar é necessário selecionar um voto e inserir uma justificativa'
      })

      return
    }

    setIsLoading(true)

    if (!userResourceVote) {
      await createResourceVote({
        resourceId: resource!.id,
        vote: vote === 'Aprovado',
        justification
      })
    }

    if (userResourceVote) {
      await updateResourceVote({
        id: userResourceVote.id,
        vote: vote === 'Aprovado',
        justification
      })
    }

    const updatedUser = await getAuthUser()
    setUser(updatedUser)

    setIsLoading(false)
    closeModal(id)

    showToast({
      title: 'Seu voto foi enviado!',
      description: 'Agradecemos sua participação!',
      icon: <FaThumbsUp size={24} color={theme.colors.brand[7]} />,
      dark
    })
  }

  return (
    <Stack spacing="sm">
      <DefaultCloseButton onClick={() => closeModal(id)} title="Fechar modal" />

      <DefaultOverlay visible={isLoading} />

      <Group spacing={32} align="start" position="center" py="md">
        <ActionButton
          text="Aprovar"
          icon={setVoteIcon(true)}
          onClick={() => setVote('Aprovado')}
        />

        <ActionButton
          text="Desaprovar"
          icon={setVoteIcon(false)}
          onClick={() => setVote('Reprovado')}
        />
      </Group>

      <Textarea
        required
        radius="md"
        size="md"
        autosize
        minRows={4}
        maxRows={5}
        variant="filled"
        onChange={(e) => setJustification(e.target.value)}
        value={justification}
        sx={textareaStyles(theme, dark)}
        placeholder="Por favor forneça uma justificativa"
      />

      <ConfirmButtons
        onCancel={() => closeModal(id)}
        onConfirm={() => handleOnConfirm()}
        onConfirmText={onConfirmText}
      />
    </Stack>
  )
}
