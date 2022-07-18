import { Title as MantineTitle } from '@mantine/core'

interface TitleProps {
  name: string
  padding?: number
}

export function Title({ name, padding }: TitleProps) {
  return (
    <MantineTitle
      order={1}
      px={padding ?? 0}
      pt={padding ?? 0}
      sx={(theme) => ({
        fontSize: theme.fontSizes.xl,
        fontWeight: 600,
        color: theme.colors.cyan[3]
      })}
    >
      {name}
    </MantineTitle>
  )
}
