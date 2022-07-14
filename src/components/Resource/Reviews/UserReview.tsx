import { Avatar, Box, Divider, Group, Menu, Stack, Text } from '@mantine/core'
import { MdDelete, MdEdit, MdStar, MdStarBorder } from 'react-icons/md'
import { TiCancel } from 'react-icons/ti'

interface UserReviewProps {
  isOwnReview?: boolean
}

export function UserReview({ isOwnReview }: UserReviewProps) {
  return (
    <>
      <Stack px="md" spacing={12}>
        <Group position="apart">
          <Group spacing="sm" align="center">
            <Avatar radius="xl" size={35} src="/avatar.png" />

            <Stack spacing={0}>
              <Text
                size="sm"
                weight={500}
                sx={(theme) => ({
                  color: theme.colors.cyan[3]
                })}
              >
                Nome Completo
              </Text>
              <Text
                size="xs"
                sx={(theme) => ({
                  color: theme.colors.gray[3],
                  lineHeight: 1.5
                })}
              >
                10 avaliações
              </Text>
            </Stack>
          </Group>

          <Menu
            position="right"
            sx={{ transform: 'rotate(90deg)' }}
            transition="pop-bottom-left"
            size={isOwnReview ? 'sm' : 230}
          >
            {isOwnReview ? (
              <>
                <Menu.Item icon={<MdEdit size={14} color="cyan" />}>
                  <Box ml={8}>Editar avaliação</Box>
                </Menu.Item>
                <Menu.Item icon={<MdDelete size={14} color="cyan" />}>
                  <Box ml={8}>Excluir avaliação</Box>
                </Menu.Item>
              </>
            ) : (
              <Menu.Item icon={<TiCancel size={18} color="cyan" />}>
                <Box ml={8}>Sinalizar como inadequado</Box>
              </Menu.Item>
            )}
          </Menu>
        </Group>

        <Group spacing={2} align="center">
          <MdStar size={18} color="yellow" />
          <MdStar size={18} color="yellow" />
          <MdStar size={18} color="yellow" />
          <MdStar size={18} color="yellow" />
          <MdStarBorder size={18} />
          <Text
            size="xs"
            ml="xs"
            sx={(theme) => ({
              color: theme.colors.gray[3],
              lineHeight: 1
            })}
          >
            10/06/22
          </Text>
        </Group>

        <Text
          sx={(theme) => ({
            color: theme.colors.gray[3],
            lineHeight: 1.5
          })}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mattis
          rutrum fames quam tempus vitae sed malesuada. Vulputate purus accumsan
          neque in vitae. Orci venenatis turpis rutrum vitae diam sed. At
          placerat elit mattis nam nunc. Nibh donec sagittis, sed enim felis
          mollis vitae aliquet varius. Blandit donec vestibulum, fermentum et
          pretium.
        </Text>
      </Stack>

      {isOwnReview && (
        <Divider
          my="md"
          size="xs"
          color="none"
          sx={(theme) => ({ color: theme.colors.gray[6] })}
        />
      )}
    </>
  )
}
