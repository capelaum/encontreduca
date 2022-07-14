import { Box, Divider, Group, Image, Stack, Text } from '@mantine/core'
import { Search } from 'components/Map/Search'
import { MdDirections, MdEdit, MdStarBorder } from 'react-icons/md'
import { ResourceType } from 'types/resources'
import { ActionButton } from './ActionButton'
import { Back } from './Back'
import { Category } from './Category'
import { Info } from './Info'
import { ReviewStats } from './ReviewStats'
import { Title } from './Title'

interface ResourceProps {
  resource: ResourceType
  setResourceOpened: (opened: boolean) => void
  setMenuOpened: (opened: boolean) => void
}

export function Resource({
  resource,
  setResourceOpened,
  setMenuOpened
}: ResourceProps) {
  return (
    <Box>
      <Search setMenuOpened={setMenuOpened} isResourceOpened />

      <Stack mt={94} px="md" spacing="md">
        <Stack spacing="sm">
          <Group align="start" position="apart" spacing={0}>
            <Title name={resource.name} />
            <Back setResourceOpened={setResourceOpened} />
          </Group>

          <Category category={resource.category} />
        </Stack>

        <Stack spacing="sm">
          <Image
            width="100%"
            height={200}
            radius="md"
            src={resource.cover}
            alt={`Imagem de capa do recurso ${resource.name}`}
            title={`Imagem de capa do recurso ${resource.name}`}
          />

          <ReviewStats />

          <Text
            size="sm"
            sx={(theme) => ({
              color: theme.colors.gray[4]
            })}
          >
            Criado por Nome Completo
          </Text>
        </Stack>

        <Group spacing="lg" align="start" position="center" mt="md">
          <ActionButton text="Rotas" icon={<MdDirections size={28} />} />
          <ActionButton text="Avaliar" icon={<MdStarBorder size={28} />} />
          <ActionButton text="Sugerir Mudança" icon={<MdEdit size={28} />} />
        </Group>
      </Stack>

      <Divider
        my="md"
        size="xs"
        color="none"
        sx={(theme) => ({ color: theme.colors.gray[6] })}
      />

      <Info
        address={resource.address}
        website={resource.website}
        phone={resource.phone}
      />

      <Divider
        my="md"
        size="xs"
        color="none"
        sx={(theme) => ({ color: theme.colors.gray[6] })}
      />
    </Box>
  )
}
