import { CSSObject, MantineTheme } from '@mantine/core'

export const afterStyles = (theme: MantineTheme, dark: boolean): CSSObject => ({
  backgroundColor: dark ? theme.colors.brand[7] : theme.colors.gray[0],
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 500,
  color: theme.white,
  '&:hover': {
    backgroundColor: dark ? theme.colors.brand[7] : theme.colors.gray[0],
    '&::after': {
      content: '"Alterar imagem"',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      borderRadius: 'inherit',
      inset: 0,
      color: theme.colors.brand[7],
      backgroundColor: 'rgba(102, 217, 232, 0.7)'
    }
  }
})
