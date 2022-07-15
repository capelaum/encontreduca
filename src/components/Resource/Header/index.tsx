import { Group, Stack } from '@mantine/core'
import { useSidebar } from 'contexts/sidebarContext'
import { Back } from './Back'
import { Category } from './Category'
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
