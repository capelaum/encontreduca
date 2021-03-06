import { Stack, Text, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { SectionTitle } from './SectionTitle'

type Paragraph = {
  id: number
  text: string
}

interface DescriptionProps {
  title: string
  paragraphs: Paragraph[]
  isDark?: boolean
}

export function Description({ title, paragraphs, isDark }: DescriptionProps) {
  const largeScreen = useMediaQuery('(min-width: 992px)', false)
  const theme = useMantineTheme()

  return (
    <Stack
      spacing={40}
      sx={{
        width: largeScreen ? '45%' : 'auto'
      }}
    >
      <SectionTitle title={title} isDark={isDark} />

      <Stack
        sx={{
          color: isDark ? theme.white : theme.colors.brand[7],
          fontSize: '18px',
          strong: {
            color: isDark ? theme.colors.cyan[3] : theme.colors.brand[7]
          }
        }}
      >
        {paragraphs.map((paragraph) => (
          <Text
            key={paragraph.id}
            dangerouslySetInnerHTML={{ __html: paragraph.text }}
          />
        ))}
      </Stack>
    </Stack>
  )
}
