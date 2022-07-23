import { Title as MantineTitle, useMantineColorScheme } from '@mantine/core'

interface TitleProps {
  name: string
  padding?: number
  isModal?: boolean
}

export function Title({ name, padding, isModal }: TitleProps) {
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <MantineTitle
      order={1}
      px={padding ?? 0}
      pt={padding ?? 0}
      pr={isModal ? 20 : 0}
      sx={(theme) => ({
        fontSize: isModal ? theme.fontSizes.lg : theme.fontSizes.xl,
        fontWeight: 700,
        color: dark ? theme.colors.cyan[3] : theme.colors.brand[7]
      })}
    >
      {name}
    </MantineTitle>
  )
}
