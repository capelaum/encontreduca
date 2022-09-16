import { CSSObject, MantineTheme } from '@mantine/core'

export const searchInputStyles = (
  theme: MantineTheme,
  dark: boolean
): CSSObject => ({
  width: '100%',
  zIndex: 1,
  borderRadius: theme.radius.md,
  input: {
    color: dark ? theme.white : theme.colors.brand[7],
    backgroundColor: dark ? theme.colors.brand[7] : theme.colors.gray[0],
    border: `1px solid ${dark ? theme.colors.cyan[3] : theme.colors.brand[7]}`,
    '&:focus': {
      backgroundColor: dark ? theme.colors.brand[8] : theme.colors.gray[1],
      outline: `1px solid ${
        dark ? theme.colors.cyan[3] : theme.colors.brand[7]
      }`
    },
    '&::placeholder': {
      color: theme.colors.gray[6]
    }
  }
})

export const mapSearchInputStyles = (
  theme: MantineTheme,
  dark: boolean
): CSSObject => ({
  flex: 1,
  input: {
    color: dark ? theme.white : theme.colors.brand[7],
    backgroundColor: dark ? theme.colors.brand[7] : theme.colors.gray[0],
    border: 'none',
    '&:focus': {
      outline: 'none',
      border: 'none'
    }
  }
})
