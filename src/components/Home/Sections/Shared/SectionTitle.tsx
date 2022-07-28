import { Title, useMantineTheme } from '@mantine/core'

interface SectinTitleProps {
  title: string
  isDark?: boolean
}

export function SectionTitle({ title, isDark }: SectinTitleProps) {
  const theme = useMantineTheme()

  return (
    <Title
      sx={{
        color: isDark ? theme.colors.cyan[3] : theme.colors.brand[7],
        paddingLeft: '12px',
        paddingBottom: '4px',
        fontWeight: 500,
        fontSize: '32px',
        borderLeft: `7px solid ${
          isDark ? theme.colors.gray[4] : theme.colors.cyan[4]
        }`
      }}
    >
      {title}
    </Title>
  )
}
