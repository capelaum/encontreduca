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
    backgroundColor: dark ? theme.colors.brand[8] : theme.colors.gray[2],
    border: 'none',
    '&:focus': {
      backgroundColor: dark ? theme.colors.brand[8] : theme.white,
      outline: `1px solid ${theme.colors.cyan[3]}`
    },
    '&::placeholder': {
      color: theme.colors.gray[6]
    }
  }
})
