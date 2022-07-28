import { Group } from '@mantine/core'
import { Back } from './Back'
import { Title } from './Title'

interface SidebarHeaderProps {
  title: string
  closeSidebar: () => void
}

export function SidebarHeader({ title, closeSidebar }: SidebarHeaderProps) {
  return (
    <Group noWrap align="start" position="apart" spacing={4}>
      <Title name={title} />
      <Back closeSidebar={closeSidebar} />
    </Group>
  )
}
