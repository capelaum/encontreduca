import { Stack } from '@mantine/core'
import { Category } from 'components/Shared/Category'
import { SidebarHeader } from 'components/Shared/SidebarHeader'
import { useResource } from 'contexts/resourceContext'
import { useSidebar } from 'contexts/sidebarContext'

export function Header() {
  const { setResourceOpened } = useSidebar()
  const { resource } = useResource()

  return (
    <Stack spacing="sm">
      <SidebarHeader
        title={resource!.name}
        closeSidebar={() => setResourceOpened(false)}
      />

      <Category category={resource!.category} />
    </Stack>
  )
}
