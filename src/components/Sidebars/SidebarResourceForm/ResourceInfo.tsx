import {
  Select,
  Text,
  TextInput,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { useResource } from 'contexts/resourceContext'
import { TbChevronDown } from 'react-icons/tb'
import { inputStyles } from 'styles/inputStyles'
import { ResourceFormValues } from 'types/forms'
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
        required
        label="Nome do recurso"
        placeholder="Nome do recurso"
        {...form.getInputProps('name')}
        sx={inputStyles(theme, dark)}
      />

      <Select
        required
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
        required
        label="Endereço"
        placeholder="Endereço do recurso"
        {...form.getInputProps('address')}
        sx={inputStyles(theme, dark)}
      />
    </>
  )
}
