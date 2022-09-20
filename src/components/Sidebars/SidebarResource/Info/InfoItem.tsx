import {
  ActionIcon,
  Box,
  CopyButton,
  Group,
  Text,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { ReactNode, useState } from 'react'
import { MdContentCopy, MdOutlineCheck } from 'react-icons/md'
import { TbExternalLink } from 'react-icons/tb'

interface InfoItemProps {
  icon: ReactNode
  text: string
  type?: 'address' | 'phone' | 'website'
}

export function InfoItem({ icon, text, type }: InfoItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  const largeScreen = useMediaQuery('(min-width: 768px)', false)
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const renderIcon = (copied: boolean) => {
    if (type === 'website') {
      return (
        <TbExternalLink
          size={18}
          color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}
        />
      )
    }

    return copied ? (
      <MdOutlineCheck
        size={16}
        color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}
      />
    ) : (
      <MdContentCopy
        size={16}
        color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}
      />
    )
  }

  const setLabel = (copied: boolean) => {
    if (copied) return 'Copiado'
    switch (type) {
      case 'address':
        return 'Copiar Endereço'
      case 'phone':
        return 'Copiar Telefone'
      case 'website':
        return 'Abrir Website'
      default:
        return 'Info'
    }
  }

  return (
    <CopyButton value={text} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip
          label={setLabel(copied)}
          withArrow
          position="right"
          color={theme.colors.brand[7]}
        >
          <Group
            spacing={16}
            align="center"
            noWrap
            pl="md"
            pr="xl"
            py={16}
            onClick={copy}
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{
              position: 'relative',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                cursor: 'pointer',
                backgroundColor: dark
                  ? theme.colors.brand[8]
                  : theme.colors.gray[2]
              }
            }}
          >
            <Box>{icon}</Box>
            <Text
              size="sm"
              sx={{
                color: dark ? theme.white : theme.colors.brand[7],
                maxWidth: '320px',
                fontWeight: 400,
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {text}
            </Text>
            <ActionIcon
              color={dark ? theme.colors.cyan[3] : theme.colors.gray[3]}
              size="sm"
              sx={{ position: 'absolute', right: '20px' }}
            >
              {(isHovered || !largeScreen) && renderIcon(copied)}
            </ActionIcon>
          </Group>
        </Tooltip>
      )}
    </CopyButton>
  )
}
