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
  const [saveIcon, setSaveIcon] = useState(iconTypes.unsaved)

  const saveResource = () => {
    if (saveIcon === iconTypes.unsaved) {
      setSaveIcon(iconTypes.saved)
    }

    if (saveIcon === iconTypes.saved) {
      setSaveIcon(iconTypes.unsaved)
    }
  }

  return (
    <ActionButton
      text={saveIcon.text}
      icon={saveIcon.icon}
      onClick={saveResource}
    />
  )
}
