import { ActionIcon, Group, Image, Stack, Title } from '@mantine/core'
import { BsBookmark } from 'react-icons/bs'
import { HiArrowLeft } from 'react-icons/hi'
import { theme as myTheme } from 'styles/theme'
import { ResourceType } from 'types/resources'
import { Category } from './Category'

interface ResourceProps {
  resource: ResourceType
  setResourceOpened: (opened: boolean) => void
}

export function Resource({ setResourceOpened, resource }: ResourceProps) {
  return (
    <Stack mt={94} px="md" spacing="md">
      <Stack spacing={8}>
        <Group align="start" position="apart" spacing={0}>
          <Group
            spacing={12}
            noWrap
            align="center"
            sx={{
              maxWidth: '340px',
              display: 'inline-flex'
            }}
          >
            <Title
              sx={(theme) => ({
                fontSize: theme.fontSizes.xl,
                color: theme.colors.cyan[3],
                display: 'inline-flex',
                alignItems: 'end',
                justifyContent: 'flex-start'
              })}
            >
              {resource.name}
              <ActionIcon
                variant="transparent"
                ml={8}
                // sx={{ border: '1px solid red' }}
              >
                <BsBookmark size={20} color={myTheme.colors!.brand![0]} />
              </ActionIcon>
            </Title>
          </Group>

          <ActionIcon
            variant="hover"
            size="lg"
            color="brand"
            onClick={() => setResourceOpened(false)}
            title="Fechar recurso"
            sx={(theme) => ({
              color: theme.colors.cyan[3]
            })}
          >
            <HiArrowLeft size={24} />
          </ActionIcon>
        </Group>

        <Category category={resource.category} />
      </Stack>

      <Stack spacing="md">
        <Image
          width="100%"
          height={200}
          radius="md"
          src={resource.cover}
          alt={`Imagem de capa do recurso ${resource.name}`}
          title={`Imagem de capa do recurso ${resource.name}`}
        />
      </Stack>
    </Stack>
  )
}
