import { CSSObject, MantineTheme } from '@mantine/core'

export const dropzoneStyles = (
  theme: MantineTheme,
  dark: boolean
): CSSObject => ({
  backgroundColor: dark ? theme.colors.brand[7] : theme.colors.gray[0],
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 500,
  width: '100%',
  color: dark ? theme.colors.gray[4] : theme.colors.gray[6],
  border: `2px dashed  ${dark ? theme.colors.cyan[3] : theme.colors.brand[7]}`,
  '&[error]': {
    border: `2px dashed  ${theme.colors.red[6]}`
  },
  '&[data-idle]': {
    '&:hover': {
      '&::after': {
        content: '"Alterar imagem"',
        position: 'absolute',
        inset: 0,
        display: 'flex',
        fontWeight: 500,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 'inherit',
        backgroundColor: 'rgba(102, 217, 232, 0.7)',
        color: theme.colors.brand[7]
      }
    }
  },
  '&[data-loading]': {
    svg: {
      stroke: theme.colors.brand[2]
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      display: 'flex',
      fontWeight: 500,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 'inherit',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      color: theme.colors.brand[7]
    }
  },
  '&[data-accept]': {
    color: theme.white,
    backgroundColor: 'rgba(102, 217, 232, 0.3)'
  },

  '&[data-reject]': {
    color: theme.white,
    backgroundColor: 'rgba(255, 0, 0, 0.3)'
  }
})
