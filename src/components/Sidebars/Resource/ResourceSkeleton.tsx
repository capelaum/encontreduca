import {
  Center,
  CSSObject,
  Divider,
  Group,
  Loader,
  Skeleton,
  Stack,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'

export function ResourceSkeleton() {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const skeletonStyles = (): CSSObject => ({
    '&::before': {
      backgroundColor: dark ? theme.colors.brand[7] : theme.colors.gray[1]
    },
    '&::after': {
      backgroundColor: dark ? theme.colors.brand[8] : theme.colors.gray[3]
    }
  })

  return (
    <>
      <Stack mt={88} px="md" spacing="md">
        <Skeleton height={28} radius="lg" sx={skeletonStyles} />
        <Skeleton height={18} width="40%" radius="lg" sx={skeletonStyles} />
        <Stack spacing={16}>
          <Skeleton height={200} radius={7} sx={skeletonStyles} />
          <Skeleton height={16} width="40%" radius="lg" sx={skeletonStyles} />
          <Skeleton height={14} width="60%" radius="lg" sx={skeletonStyles} />
        </Stack>
        <Group spacing={32} align="start" mt="md">
          <Stack spacing={14}>
            <Skeleton height={44} width={44} radius="md" sx={skeletonStyles} />
            <Skeleton height={12} width={44} radius="sm" sx={skeletonStyles} />
          </Stack>
          <Stack spacing={14}>
            <Skeleton height={44} width={44} radius="md" sx={skeletonStyles} />
            <Skeleton height={12} width={44} radius="sm" sx={skeletonStyles} />
          </Stack>
          <Stack spacing={14}>
            <Skeleton height={44} width={44} radius="md" sx={skeletonStyles} />
            <Skeleton height={12} width={44} radius="sm" sx={skeletonStyles} />
          </Stack>
          <Stack spacing={14}>
            <Skeleton height={44} width={44} radius="md" sx={skeletonStyles} />
            <Skeleton height={12} width={44} radius="sm" sx={skeletonStyles} />
          </Stack>
        </Group>
      </Stack>

      <Divider
        mt="md"
        size="xs"
        color="none"
        sx={{ color: dark ? theme.colors.gray[6] : theme.colors.gray[4] }}
      />

      <Stack spacing="md" my="md" px="md">
        <Skeleton height={40} radius="md" sx={skeletonStyles} />
        <Skeleton height={40} radius="md" sx={skeletonStyles} />
        <Skeleton height={40} radius="md" sx={skeletonStyles} />
      </Stack>

      <Divider
        mb="md"
        size="xs"
        color="none"
        sx={{ color: dark ? theme.colors.gray[6] : theme.colors.gray[4] }}
      />

      <Center my={64}>
        <Loader color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]} />
      </Center>
    </>
  )
}
