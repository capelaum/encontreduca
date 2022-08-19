import {
  ActionIcon,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'

interface InputPasswordVisibilityProps {
  isPasswordVisible: boolean
  setIsPasswordVisible: (isPasswordVisible: boolean) => void
}

export function InputPasswordVisibility({
  isPasswordVisible,
  setIsPasswordVisible
}: InputPasswordVisibilityProps) {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <ActionIcon
      radius="xl"
      sx={{
        '&:focus': {
          backgroundColor: dark ? theme.colors.brand[8] : theme.colors.gray[3],
          border: `none`,
          outline: 'none'
        }
      }}
    >
      {isPasswordVisible ? (
        <MdVisibilityOff
          size={16}
          color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        />
      ) : (
        <MdVisibility
          size={16}
          color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        />
      )}
    </ActionIcon>
  )
}
