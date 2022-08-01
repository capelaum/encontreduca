import {
  Select,
  Text,
  TextInput,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { inputStyles } from 'components/Shared/styles/inputStyles'
import { useResource } from 'contexts/resourceContext'
import { TbChevronDown } from 'react-icons/tb'
import { ResourceFormValues } from 'types/resources'
import { getCategoriesSelectData } from 'utils/modalSelecDataFormatter'

interface ResourceInfoProps {
  form: UseFormReturnType<ResourceFormValues>
}

export function ResourceInfo({ form }: ResourceInfoProps) {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { categories } = useResource()
  const resourceCategories = getCategoriesSelectData(categories)

  return (
    <>
      <Text mt={12} size="lg">
        Informações do local
      </Text>

      <TextInput
        radius="md"
        label="Nome do recurso"
        placeholder="Nome do recurso"
        {...form.getInputProps('resourceName')}
        sx={inputStyles(theme, dark)}
        required
      />

      <Select
        required
        size="sm"
        radius="md"
        label="Categoria"
        placeholder="Selecione uma categoria"
        {...form.getInputProps('categoryId')}
        sx={inputStyles(theme, dark)}
        maxDropdownHeight={300}
        rightSectionWidth={30}
        rightSection={
          <TbChevronDown
            size={14}
            color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}
          />
        }
        data={resourceCategories}
      />

      <TextInput
        placeholder="Endereço do recurso"
        label="Endereço"
        radius="md"
        {...form.getInputProps('resourceAddress')}
        sx={inputStyles(theme, dark)}
        required
      />
    </>
  )
}
