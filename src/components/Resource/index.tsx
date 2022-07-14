import { Group, Image, Stack, Text } from '@mantine/core'
import { ResourceType } from 'types/resources'
import { Back } from './Back'
import { Category } from './Category'
import { Reviews } from './Reviews'
import { Title } from './Title'

interface ResourceProps {
  resource: ResourceType
  setResourceOpened: (opened: boolean) => void
}

export function Resource({ setResourceOpened, resource }: ResourceProps) {
  return (
    <Stack mt={94} px="md" spacing="md">
      <Stack spacing={8}>
        <Group align="start" position="apart" spacing={0}>
          <Title name={resource.name} />
          <Back setResourceOpened={setResourceOpened} />
        </Group>

        <Category category={resource.category} />
      </Stack>

      <Stack spacing={8}>
        <Image
          width="100%"
          height={200}
          radius="md"
          src={resource.cover}
          alt={`Imagem de capa do recurso ${resource.name}`}
          title={`Imagem de capa do recurso ${resource.name}`}
        />

        <Reviews />

        <Text size="sm">Criado por Nome Completo</Text>
      </Stack>
    </Stack>
  )
}
