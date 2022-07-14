import { Group } from '@mantine/core'
import { Title } from 'components/Shared/Title'
import { BsBookmark } from 'react-icons/bs'
import { myTheme } from 'styles/theme'

interface TitleProps {
  name: string
}

export function ResourceTitle({ name }: TitleProps) {
  return (
    <Group
      spacing={8}
      noWrap
      align="center"
      position="left"
      sx={{
        maxWidth: '340px'
      }}
    >
      <Group align="center">
        <BsBookmark size={20} color={myTheme.colors!.brand![0]} />
      </Group>
      <Title name={name} />
    </Group>
  )
}
