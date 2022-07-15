import { Title as MantineTitle } from '@mantine/core'

interface TitleProps {
  name: string
  padding?: number
}

export function Title({ name, padding }: TitleProps) {
  return (
    <MantineTitle
      px={padding ?? 0}
      pt={padding ?? 0}
      sx={(theme) => ({
        fontSize: theme.fontSizes.xl,
        color: theme.colors.cyan[3],
        display: 'inline-flex',
        alignItems: 'end',
        justifyContent: 'flex-start'
      })}
    >
      {name}
    </MantineTitle>
  )
}
