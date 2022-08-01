import { CSSObject, MantineTheme } from '@mantine/core'

export const inputStyles = (theme: MantineTheme, dark: boolean): CSSObject => ({
  input: {
    border: `1px solid ${dark ? theme.colors.cyan[3] : theme.colors.brand[7]}`,
    backgroundColor: dark ? theme.colors.brand[7] : theme.colors.gray[0],
    color: dark ? theme.white : theme.colors.brand[7],
    '&::placeholder': {
      color: dark ? theme.colors.gray[6] : theme.colors.gray[6]
    },
    '&:focus': {
      border: `1px solid ${dark ? theme.colors.cyan[2] : theme.colors.cyan[3]}`
    }
  },
  label: {
    color: dark ? theme.colors.cyan[3] : theme.colors.brand[7],
    marginBottom: theme.spacing.xs
  },
  '.mantine-TextInput-invalid, .mantine-Select-invalid': {
    border: `1px solid ${theme.colors.red[6]}`,
    '&:focus': {
      border: `1px solid ${theme.colors.red[6]}`
    }
  },
  '.mantine-TextInput-error, .mantine-Select-error': {
    paddingTop: '4px',
    color: theme.colors.red[6]
  }
})

export const textareaStyles = (
  theme: MantineTheme,
  dark: boolean
): CSSObject => ({
  textarea: {
    padding: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
    color: dark ? theme.white : theme.colors.brand[7],
    backgroundColor: dark ? theme.colors.brand[8] : theme.white,
    border: `1px solid ${dark ? theme.colors.cyan[3] : theme.colors.brand[8]}`,
    '&:focus': {
      outline: `1px solid ${dark ? theme.white : theme.colors.cyan[3]}`
    },
    '&::placeholder': {
      color: dark ? theme.colors.gray[6] : theme.colors.gray[6]
    },
    '&::-webkit-scrollbar': {
      background: 'transparent',
      width: '3px'
    },
    '&::-webkit-scrollbar-thumb': {
      background: dark ? theme.colors.cyan[3] : theme.colors.brand[7],
      borderRadius: '5px'
    }
  },
  label: {
    color: dark ? theme.colors.cyan[3] : theme.colors.brand[7]
  }
})

export const buttonStyles = (
  theme: MantineTheme,
  dark: boolean
): CSSObject => ({
  backgroundColor: dark ? theme.colors.cyan[3] : theme.colors.brand[7],
  color: dark ? theme.colors.brand[7] : theme.white,
  border: 'none',
  '&:hover': {
    backgroundColor: dark ? theme.colors.cyan[4] : theme.colors.brand[8]
  }
})
