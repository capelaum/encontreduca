import { useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { useSidebar } from 'contexts/sidebarContext'
import { MdEdit } from 'react-icons/md'
import { ModalResourceChangeButton } from '../ModalResourceChangeButton'

interface ResourceChangeProps {
  onClose: () => void
}

export function ResourceChange({ onClose }: ResourceChangeProps) {
  const { setChangeResourceOpened } = useSidebar()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <ModalResourceChangeButton
      icon={
        <MdEdit
          size={24}
          color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}
        />
      }
      label="Sugerir alterações de informações do recurso"
      description="Editar nome, local, endereço, contato, etc."
      onClick={() => {
        onClose()
        setChangeResourceOpened(true)
      }}
    />
  )
}
