import { Box, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { showToast, showToastError } from 'components/Shared/ToastMessage'
import { useAuth } from 'contexts/authContext'
import { useResource } from 'contexts/resourceContext'
import { createUserResource, deleteUserResource, getUser } from 'lib/usersLib'
import { useEffect, useState } from 'react'
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs'
import { ActionButton } from './ActionButton'

export function ActionResourceSave() {
  const [isSaved, setIsSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { resource } = useResource()
  const { user, setUser } = useAuth()

  useEffect(() => {
    if (user && resource) {
      const { id } = resource
      const { resourcesIds } = user

      if (resourcesIds.includes(+id)) {
        setIsSaved(true)
      }

      if (!resourcesIds.includes(+id)) {
        setIsSaved(false)
      }
    }
  }, [user, resource])

  const handleSaveResource = async () => {
    const wasSaved = isSaved

    if (!user || !resource) {
      showToastError({
        title: 'Ooops, algo deu errado.',
        description: 'Não foi possível salvar recurso ou remove-lo dos salvos..'
      })

      return
    }

    setIsLoading(true)

    try {
      if (!isSaved) {
        await createUserResource(+resource.id)
      }

      if (isSaved) {
        await deleteUserResource(+resource.id)
      }
    } catch (error) {
      setIsLoading(false)

      showToastError({
        title: 'Ooops, algo deu errado.',
        description: 'Não foi possível salvar recurso ou remove-lo dos salvos..'
      })

      return
    }

    const updatedUser = await getUser(+user.id)
    setUser(updatedUser)

    setIsLoading(false)

    showToast({
      title: wasSaved ? 'Recurso removido dos salvos' : 'Recurso salvo',
      description: wasSaved
        ? 'Você pode sempre salvar novamente.'
        : 'Agora disponível na lista de salvos.',
      icon: wasSaved ? (
        <BsBookmarkStar size={20} color={theme.colors.brand[8]} />
      ) : (
        <BsBookmarkStarFill size={20} color={theme.colors.brand[8]} />
      ),
      dark
    })

    setIsSaved(() => !isSaved)
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <ActionButton
        isLoading={isLoading}
        text={isSaved ? 'Salvo' : 'Salvar'}
        icon={
          isSaved ? (
            <BsBookmarkStarFill size={24} />
          ) : (
            <BsBookmarkStar size={24} />
          )
        }
        onClick={handleSaveResource}
      />
    </Box>
  )
}
