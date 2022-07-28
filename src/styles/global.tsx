import { Global } from '@mantine/core'

export const GlobalStyles = () => (
  <Global
    styles={(theme) => ({
      '*, *::before, *::after': { boxSizing: 'border-box' },
      body: {
        margin: 0,
        padding: 0,
        fontFamily: theme.fontFamily,
        color: theme.colors.cyan[3],
        backgroundColor: theme.colors.brand[7]
      },
      html: {
        scrollBehavior: 'smooth'
      },
      '.Toastify__toast-theme--dark': {
        color: theme.colors.brand[7],
        backgroundColor: theme.colors.cyan[3]
      },
      '.Toastify__toast-theme--light': {
        color: theme.colors.brand[7],
        backgroundColor: theme.white
      },
      '.Toastify__progress-bar-theme--light': {
        backgroundColor: theme.colors.brand[7]
      },
      '.Toastify__progress-bar-theme--dark': {
        backgroundColor: theme.colors.brand[7]
      },
      '.Toastify__close-button': {
        color: theme.colors.brand[7]
      },
      '.Toastify__toast-container': {
        width: '100%',
        maxWidth: '400px'
      }
    })}
  />
)
