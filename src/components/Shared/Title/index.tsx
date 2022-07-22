import { Title as MantineTitle } from '@mantine/core'

interface TitleProps {
  name: string
  padding?: number
  isModal?: boolean
}

export function Title({ name, padding, isModal }: TitleProps) {
  return (
    <MantineTitle
      order={1}
      px={padding ?? 0}
      pt={padding ?? 0}
      pr={isModal ? 20 : 0}
      sx={(theme) => ({
        fontSize: isModal ? theme.fontSizes.lg : theme.fontSizes.xl,
        fontWeight: 600,
        color: theme.colors.cyan[3]
        // maxWidth: '100%',
        // overflow: 'hidden',
        // whiteSpace: 'nowrap',
        // textOverflow: 'ellipsis',
      })}
    >
      {name}
    </MantineTitle>
  )
}
