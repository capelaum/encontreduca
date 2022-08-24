import {
  TextInput,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useState } from 'react'
import { inputStyles } from 'styles/inputStyles'
import { PasswordFormTypes } from 'types/forms'
import { InputPasswordVisibility } from './InputPasswordVisibility'

interface PasswordGroupProps {
  form: PasswordFormTypes
  isConfirmPassord?: boolean
  isRequired?: boolean
  isAutoComplete?: boolean
}

export function PasswordGroup({
  form,
  isConfirmPassord = true,
  isRequired = true,
  isAutoComplete
}: PasswordGroupProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false)

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <>
      <TextInput
        required={isRequired}
        type={isPasswordVisible ? 'text' : 'password'}
        autoComplete={isAutoComplete ? 'true' : 'new-password'}
        label="Senha"
        placeholder="Senha"
        {...form.getInputProps('password')}
        sx={inputStyles(theme, dark)}
        rightSection={
          <InputPasswordVisibility
            isPasswordVisible={isPasswordVisible}
            setIsPasswordVisible={setIsPasswordVisible}
          />
        }
      />

      {isConfirmPassord && (
        <TextInput
          required={isRequired}
          type={isConfirmPasswordVisible ? 'text' : 'password'}
          label="Repetir senha"
          placeholder="Repetir senha"
          {...form.getInputProps('confirmPassword')}
          sx={inputStyles(theme, dark)}
          rightSection={
            <InputPasswordVisibility
              isPasswordVisible={isConfirmPasswordVisible}
              setIsPasswordVisible={setIsConfirmPasswordVisible}
            />
          }
        />
      )}
    </>
  )
}
