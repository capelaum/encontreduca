import { Title, useMantineTheme } from '@mantine/core'

interface SectionTitleProps {
  title: string
}

export function SectionTitle({ title }: SectionTitleProps) {
  const theme = useMantineTheme()

  return (
    <Title
      order={2}
      px="md"
      mb={24}
      sx={{
        fontSize: theme.fontSizes.lg
      }}
    >
      {title}
    </Title>
  )
}
