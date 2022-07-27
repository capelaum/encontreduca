import { Group, Stack } from '@mantine/core'
import { Title } from 'components/Shared'
import { Back } from 'components/Shared/Back'
import { Category } from 'components/Shared/Category'
import { useSidebar } from 'contexts/sidebarContext'

export function Header() {
  const { resource, setResourceOpened } = useSidebar()

  return (
    <Stack spacing="sm">
      <Group noWrap align="start" position="apart" spacing={4}>
        <Title name={resource!.name} />
        <Back setSidebarOpened={setResourceOpened} />
      </Group>

      <Category category={resource!.category} />
    </Stack>
  )
}
