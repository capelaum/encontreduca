import { Group, Stack } from '@mantine/core'
import { useSidebar } from 'contexts/sidebarContext'
import { Back } from './Back'
import { Category } from './Category'
import { Title } from './Title'

export function Header() {
  const { resource, setResourceOpened } = useSidebar()

  return (
    <Stack spacing="sm">
      <Group align="start" position="apart" spacing={0}>
        <Title name={resource!.name} />
        <Back setResourceOpened={setResourceOpened} />
      </Group>

      <Category category={resource!.category} />
    </Stack>
  )
}
