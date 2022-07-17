import { CSSObject, MantineTheme } from '@mantine/core'

export const inputStyles = (theme: MantineTheme): CSSObject => ({
  input: {
    border: `1px solid ${theme.colors.cyan[4]}`
  },
  label: {
    color: theme.colors.cyan[4]
  },
  'input:focus': {
    outline: `1px solid white`
  }
})

export const textareaStyles = (theme: MantineTheme): CSSObject => ({
  textarea: {
    border: `1px solid ${theme.colors.cyan[4]}`
  },
  label: {
    color: theme.colors.cyan[4]
  },
  'textarea:focus': {
    outline: `1px solid white`
  },
  'textarea::-webkit-scrollbar': {
    background: 'transparent',
    width: '3px'
  },
  'textarea::-webkit-scrollbar-thumb': {
    background: '#66d9e8',
    borderRadius: '5px'
  }
})

export const searchInputStyles = (theme: MantineTheme): CSSObject => ({
  width: '100%',
  zIndex: 1,
  borderRadius: theme.radius.md,
  backgroundColor: theme.colors.brand[7],
  border: `1px solid ${theme.colors.brand[0]}`,
  'input:focus': {
    outline: '1px solid white'
  }
})
