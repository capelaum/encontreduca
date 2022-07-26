import { useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useState } from 'react'
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs'
import { notificationStyles } from 'styles/notificationStyles'
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

    showNotification({
      title: wasUnsaved ? 'Recurso Salvo.' : 'Recurso removido dos salvos.',
      message: wasUnsaved
        ? 'Agora este recurso estará na lista de salvos.'
        : 'Você pode sempre salvar novamente.',
      icon: wasUnsaved ? (
        <BsBookmarkStarFill size={20} color={theme.colors.brand[8]} />
      ) : (
        <BsBookmarkStar size={20} color={theme.colors.brand[8]} />
      ),
      styles: notificationStyles(theme, dark)
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
