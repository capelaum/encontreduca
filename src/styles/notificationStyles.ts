import { MantineTheme } from '@mantine/core'

export const notificationStyles = (theme: MantineTheme, dark: boolean) => ({
  root: {
    backgroundColor: dark ? theme.colors.cyan[3] : theme.white,
    borderColor: dark ? theme.colors.cyan[3] : theme.white,
    '.mantine-Notification-icon': {
      backgroundColor: 'transparent',
      marginRight: '16px',
      marginLeft: '8px'
    }
  },

  title: { color: theme.colors.brand[7] },
  description: { color: theme.colors.brand[7] },
  closeButton: {
    color: theme.colors.brand[7],
    '&:hover': {
      backgroundColor: dark ? theme.colors.cyan[4] : theme.colors.gray[2]
    }
  }
})
