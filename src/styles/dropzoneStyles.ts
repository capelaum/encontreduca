import { CSSObject, MantineTheme } from '@mantine/core'
import { DropzoneStatus } from '@mantine/dropzone'

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
      backgroundColor: 'rgba(0, 0, 0, 0.7)'
    }
  }
})

export const setDropzoneStatusColors = ({
  accepted,
  rejected
}: DropzoneStatus) => {
  if (accepted || rejected) {
    return 'rgba(102, 217, 232, 0.5)'
  }

  return 'transparent'
}

export const afterElementStyles = (
  theme: MantineTheme,
  status: DropzoneStatus
): CSSObject => ({
  '&::after': {
    content: '""',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    borderRadius: theme.radius.md,
    inset: 0,
    backgroundColor: setDropzoneStatusColors(status)
  }
})
