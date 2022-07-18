import { Group, Stack } from '@mantine/core'
import { Back } from 'components/Shared/Back'
import { useSidebar } from 'contexts/sidebarContext'
import { Category } from '../../Shared/Category'
import { ResourceTitle } from './ResourceTitle'

export function Header() {
  const { resource, setResourceOpened } = useSidebar()

  return (
    <Stack spacing="sm">
      <Group align="start" position="apart" spacing={0}>
        <ResourceTitle name={resource!.name} />
        <Back setSidebarOpened={setResourceOpened} />
      </Group>

      <Category category={resource!.category} />
    </Stack>
  )
}
