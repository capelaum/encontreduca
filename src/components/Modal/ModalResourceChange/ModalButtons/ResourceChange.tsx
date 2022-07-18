import { useSidebar } from 'contexts/sidebarContext'
import { MdEdit } from 'react-icons/md'
import { myTheme } from 'styles/theme'
import { ModalResourceChangeButton } from '../ModalResourceChangeButton'

interface ResourceChangeProps {
  onClose: () => void
}

export function ResourceChange({ onClose }: ResourceChangeProps) {
  const { setChangeResourceOpened } = useSidebar()

  return (
    <ModalResourceChangeButton
      icon={<MdEdit size={24} color={myTheme.colors!.brand![0]} />}
      label="Sugerir alterações de informações do recurso"
      description="Editar nome, local, endereço, contato, etc."
      onClick={() => {
        onClose()
        setChangeResourceOpened(true)
      }}
    />
  )
}
