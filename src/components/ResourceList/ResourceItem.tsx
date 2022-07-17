import {
  Group,
  Image,
  Stack,
  Title as MantineTitle,
  UnstyledButton
} from '@mantine/core'
import { Category } from 'components/Resource/Header/Category'
import { useMap } from 'contexts/mapContext'
import { useSidebar } from 'contexts/sidebarContext'
import { TbChevronRight } from 'react-icons/tb'
import { myTheme } from 'styles/theme'
import { ResourceType } from 'types/resources'

interface ResourceItemProps {
  resource: ResourceType | any
}

export function ResourceItem({ resource }: ResourceItemProps) {
  const { setResource, setResourceOpened, setMenuOpened } = useSidebar()
  const { moveToLocation } = useMap()

  return (
    <UnstyledButton
      onClick={() => {
        setResource(resource)
        setMenuOpened(false)
        setResourceOpened(true)
        moveToLocation(resource.position)
      }}
      sx={{
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.2)'
        },
        '&:focus': {
          backgroundColor: 'rgba(0, 0, 0, 0.2)'
        }
      }}
    >
      <Group
        key={resource.id}
        spacing={0}
        py="md"
        px="md"
        noWrap
        sx={(theme) => ({
          borderBottom: `1px solid ${theme.colors.cyan[3]}`,
          overflow: 'hidden'
        })}
      >
        <Image
          radius="md"
          width="70px"
          height="70px"
          pr={12}
          fit="cover"
          withPlaceholder
          src={resource.cover}
          alt={`Imagem de capa do recurso ${resource!.name}`}
          title={`Imagem de capa do recurso ${resource!.name}`}
        />

        <Stack spacing={4} sx={{ width: '100%' }}>
          <MantineTitle
            order={2}
            sx={(theme) =>
              ({
                maxWidth: 'calc(100% - 100px)',
                fontWeight: 500,
                fontSize: theme.fontSizes.md,
                color: theme.colors.cyan[3],
                overflow: 'hidden',
                whiteSpace: 'wrap',
                textOverflow: 'ellipsis'
              } as any)
            }
          >
            {resource.name}
          </MantineTitle>

          <Category category={resource.category} isSmall />
        </Stack>

        <TbChevronRight size={30} color={myTheme.colors!.brand![0]} />
      </Group>
    </UnstyledButton>
  )
}
