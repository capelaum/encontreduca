import {
  Text,
  TextInput,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { inputStyles } from 'components/Shared/styles/inputStyles'
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
        placeholder="(00) 00000-0000"
        label="Telefone/celular com DDD"
        radius="md"
        {...form.getInputProps('resourcePhone')}
        sx={inputStyles(theme, dark)}
      />

      <TextInput
        placeholder="Site do recurso"
        label="Site"
        radius="md"
        {...form.getInputProps('resourceWebsite')}
        sx={inputStyles(theme, dark)}
      />
    </>
  )
}
