import { ActionIcon, Box, Drawer } from '@mantine/core'
import { ReactNode } from 'react'
import { MdClose } from 'react-icons/md'
import { myTheme } from 'styles/theme'
import styles from './styles.module.scss'

interface SidebarProps {
  children: ReactNode
  opened: boolean
  setOpened: (opened: boolean) => void
  isResourceOpened?: boolean
}

export function Sidebar({
  children,
  opened,
  setOpened,
  isResourceOpened
}: SidebarProps) {
  return (
    <Drawer
      opened={opened}
      onClose={() => setOpened(false)}
      padding={0}
      size={420}
      transitionDuration={300}
      transitionTimingFunction="ease-in-out"
      withCloseButton={false}
      overlayBlur={1}
      overlayOpacity={0.6}
      withOverlay={!isResourceOpened}
    >
      {!isResourceOpened && (
        <ActionIcon
          variant="hover"
          size="lg"
          color="brand"
          onClick={() => setOpened(false)}
          title="Fechar Menu"
          sx={(theme) => ({
            color: theme.colors.cyan[3],
            position: 'absolute',
            top: theme.spacing.md,
            right: theme.spacing.md
          })}
        >
          <MdClose size={24} color={myTheme.colors!.brand![0]} />
        </ActionIcon>
      )}

      <Box className={styles.container}>{children}</Box>
    </Drawer>
  )
}
