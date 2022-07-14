import { ActionIcon, Group, Title as MantineTitle } from '@mantine/core'
import { BsBookmark } from 'react-icons/bs'
import { myTheme } from 'styles/theme'

interface TitleProps {
  name: string
}

export function Title({ name }: TitleProps) {
  return (
    <Group
      spacing={12}
      noWrap
      align="center"
      sx={{
        maxWidth: '340px'
      }}
    >
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
        <ActionIcon variant="transparent" ml={8}>
          <BsBookmark size={20} color={myTheme.colors!.brand![0]} />
        </ActionIcon>
      </MantineTitle>
    </Group>
  )
}
