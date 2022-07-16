import { Group } from '@mantine/core'
import { MdDirections } from 'react-icons/md'
import { ActionButton } from './ActionButton'
import { ResourceChange } from './ModalActions/ResourceChange'
import { ReviewCreate } from './ModalActions/ReviewCreate'

export function ActionButtons() {
  return (
    <Group spacing="lg" align="start" position="center" mt="md">
      <ActionButton text="Rotas" icon={<MdDirections size={28} />} />

      <ReviewCreate />

      <ResourceChange />
    </Group>
  )
}
