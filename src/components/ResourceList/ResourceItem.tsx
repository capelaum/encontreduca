import {
  Box,
  Group,
  Image,
  Stack,
  Text,
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
  resource: ResourceType
}

export function ResourceItem({ resource }: ResourceItemProps) {
  const { setResource, setResourceOpened, setMenuOpened, votingPanelOpened } =
    useSidebar()
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
        position="apart"
        align="center"
        noWrap
        sx={(theme) => ({
          maxWidth: '100%',
          position: 'relative',
          borderBottom: `1px solid ${theme.colors.cyan[3]}`
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
                maxWidth: 'calc(100% - 80px)',
                fontWeight: 600,
                fontSize: theme.fontSizes.md,
                color: theme.colors.cyan[3],
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis'
              } as any)
            }
          >
            {resource.name}
          </MantineTitle>

          {votingPanelOpened && (
            <Text
              sx={(theme) => ({
                color: theme.colors.gray[4],
                fontSize: theme.fontSizes.xs
              })}
            >
              Criado em{' '}
              {new Intl.DateTimeFormat('pt-BR').format(
                new Date(resource.created_at)
              )}
            </Text>
          )}

          <Category category={resource.category} isSmall />
        </Stack>

        <Box
          sx={{
            position: 'absolute',
            top: 'calc(50% - 15px)',
            right: '20px'
          }}
        >
          <TbChevronRight size={30} color={myTheme.colors!.brand![0]} />
        </Box>
      </Group>
    </UnstyledButton>
  )
}
