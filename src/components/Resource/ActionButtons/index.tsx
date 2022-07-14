import { Group } from '@mantine/core'
import { MdDirections, MdEdit, MdStarBorder } from 'react-icons/md'
import { ActionButton } from './ActionButton'

export function ActionButtons() {
  return (
    <Group spacing="lg" align="start" position="center" mt="md">
      <ActionButton text="Rotas" icon={<MdDirections size={28} />} />
      <ActionButton text="Avaliar" icon={<MdStarBorder size={28} />} />
      <ActionButton text="Sugerir Mudança" icon={<MdEdit size={28} />} />
    </Group>
  )
}
