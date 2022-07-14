import { Title as MantineTitle } from '@mantine/core'

interface TitleProps {
  name: string
}

export function Title({ name }: TitleProps) {
  return (
    <MantineTitle
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
