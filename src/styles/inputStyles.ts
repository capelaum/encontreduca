import { CSSObject, MantineTheme } from '@mantine/core'

export const inputStyles = (theme: MantineTheme, dark: boolean): CSSObject => ({
  input: {
    color: dark ? theme.white : theme.colors.brand[7],
    backgroundColor: dark ? theme.colors.brand[8] : theme.colors.gray[2],
    border: 'none',
    '&:focus': {
      backgroundColor: dark ? theme.colors.brand[8] : theme.white,
      outline: `1px solid ${theme.colors.cyan[3]}`
    },
    '&::placeholder': {
      color: dark ? theme.colors.gray[7] : theme.colors.gray[6]
    }
  },
  label: {
    color: dark ? theme.colors.cyan[3] : theme.colors.brand[7]
  }
})

export const textareaStyles = (
  theme: MantineTheme,
  dark: boolean
): CSSObject => ({
  textarea: {
    color: dark ? theme.white : theme.colors.brand[7],
    backgroundColor: dark ? theme.colors.brand[8] : theme.colors.gray[2],
    border: 'none',
    '&:focus': {
      backgroundColor: dark ? theme.colors.brand[8] : theme.white,
      outline: `1px solid ${theme.colors.cyan[3]}`
    },
    '&::placeholder': {
      color: dark ? theme.colors.gray[7] : theme.colors.gray[6]
    },
    '&::-webkit-scrollbar': {
      background: 'transparent',
      width: '3px'
    },
    '&::-webkit-scrollbar-thumb': {
      background: theme.colors.cyan[3],
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
