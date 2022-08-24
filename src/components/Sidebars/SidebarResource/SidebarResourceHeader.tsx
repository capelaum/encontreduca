import { Stack } from '@mantine/core'
import { Category } from 'components/Shared/Category'
import { SidebarHeader } from 'components/Shared/Sidebar'
import { useResource } from 'contexts/resourceContext'
import { useSidebar } from 'contexts/sidebarContext'

export function SidebarResourceHeader() {
  const { setResourceOpened } = useSidebar()
  const { resource } = useResource()

  return (
    <Stack spacing="sm">
      <SidebarHeader
        title={resource?.name ?? 'Nome do Recurso'}
        closeSidebar={() => setResourceOpened(false)}
      />

      <Category categoryName={resource?.categoryName} />
    </Stack>
  )
}
