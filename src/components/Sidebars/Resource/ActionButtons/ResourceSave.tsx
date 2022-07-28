import { useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { showToast } from 'components/Shared/ToastMessage'
import { useState } from 'react'
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs'
import { ActionButton } from './ActionButton'

const iconTypes = {
  saved: {
    icon: <BsBookmarkStarFill size={24} />,
    text: 'Salvo'
  },
  unsaved: {
    icon: <BsBookmarkStar size={24} />,
    text: 'Salvar'
  }
}

export function ResourceSave() {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const [saveIcon, setSaveIcon] = useState(iconTypes.unsaved)

  const saveResource = () => {
    const wasUnsaved = saveIcon === iconTypes.unsaved

    if (wasUnsaved) {
      setSaveIcon(iconTypes.saved)
    }

    if (!wasUnsaved) {
      setSaveIcon(iconTypes.unsaved)
    }

    showToast({
      title: wasUnsaved ? 'Recurso salvo' : 'Recurso removido dos salvos',
      description: wasUnsaved
        ? 'Agora disponível na lista de salvos.'
        : 'Você pode sempre salvar novamente.',
      icon: wasUnsaved ? (
        <BsBookmarkStarFill size={20} color={theme.colors.brand[8]} />
      ) : (
        <BsBookmarkStar size={20} color={theme.colors.brand[8]} />
      ),
      dark
    })
  }

  return (
    <ActionButton
      text={saveIcon.text}
      icon={saveIcon.icon}
      onClick={saveResource}
    />
  )
}
