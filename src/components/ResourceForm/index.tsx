import { Group } from '@mantine/core'
import { Back } from 'components/Shared/Back'
import { Title } from 'components/Shared/Title'
import { useSidebar } from 'contexts/sidebarContext'

interface ResourceFormProps {
  isCreateResource?: boolean
}

export function ResourceForm({ isCreateResource }: ResourceFormProps) {
  const { setCreateResourceOpened, setChangeResourceOpened } = useSidebar()

  return (
    <Group>
      <Title name="Sugerir alteração de recurso" />
      <Back
        setSidebarOpened={
          isCreateResource ? setCreateResourceOpened : setChangeResourceOpened
        }
      />
    </Group>
  )
}
