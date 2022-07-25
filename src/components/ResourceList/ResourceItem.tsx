import {
  Box,
  Group,
  Image,
  Stack,
  Text,
  Title as MantineTitle,
  UnstyledButton,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { Category } from 'components/Shared/Category'
import { useMap } from 'contexts/mapContext'
import { useSidebar } from 'contexts/sidebarContext'
import { TbChevronRight } from 'react-icons/tb'
import { ResourceType } from 'types/resources'

interface ResourceItemProps {
  resource: ResourceType
}

export function ResourceItem({ resource }: ResourceItemProps) {
  const { moveToLocation } = useMap()
  const { setResource, setResourceOpened, setMenuOpened, votingPanelOpened } =
    useSidebar()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <UnstyledButton
      onClick={() => {
        setResource(resource)
        setMenuOpened(false)
        setResourceOpened(true)
        moveToLocation(resource.position)
      }}
      sx={{
        '&:hover, &:focus': {
          backgroundColor: 'rgba(0, 0, 0, 0.2)'
        }
      }}
    >
      <Group
        spacing={0}
        py="md"
        px="md"
        position="apart"
        align="center"
        noWrap
        sx={{
          maxWidth: '100%',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: `1px solid ${
            dark ? theme.colors.cyan[3] : theme.colors.brand[7]
          }`
        }}
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
            sx={{
              fontWeight: 600,
              fontSize: theme.fontSizes.md,
              color: dark ? theme.colors.cyan[3] : theme.colors.brand[7],
              paddingRight: '24px'
            }}
          >
            {resource.name}
          </MantineTitle>

          {votingPanelOpened && (
            <Text
              sx={{
                color: dark ? theme.colors.gray[4] : theme.colors.gray[7],
                fontSize: theme.fontSizes.xs
              }}
            >
              Criado em{' '}
              {new Intl.DateTimeFormat('pt-BR', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                timeZone: 'America/Sao_Paulo'
              }).format(new Date(resource.created_at))}
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
          <TbChevronRight
            size={30}
            color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}
          />
        </Box>
      </Group>
    </UnstyledButton>
  )
}
