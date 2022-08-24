import {
  Text,
  TextInput,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { inputStyles } from 'styles/inputStyles'
import { ResourceFormValues } from 'types/resources'

interface ResourceContactProps {
  form: UseFormReturnType<ResourceFormValues>
}

export function ResourceContact({ form }: ResourceContactProps) {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <>
      <Text size="lg">Contato</Text>

      <TextInput
        label="Telefone/celular com DDD"
        placeholder="(00) 00000-0000"
        {...form.getInputProps('phone')}
        sx={inputStyles(theme, dark)}
      />

      <TextInput
        label="Site"
        placeholder="Site do recurso"
        {...form.getInputProps('website')}
        sx={inputStyles(theme, dark)}
      />
    </>
  )
}
