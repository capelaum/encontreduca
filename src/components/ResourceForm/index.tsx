import {
  Group,
  InputWrapper,
  Select,
  Stack,
  Text,
  TextInput
} from '@mantine/core'
import { Back } from 'components/Shared/Back'
import { Buttons } from 'components/Shared/Buttons'
import { Title } from 'components/Shared/Title'
import { useSidebar } from 'contexts/sidebarContext'
import data from 'data/categories.json'
import { useState } from 'react'
import { TbChevronDown } from 'react-icons/tb'
import { myTheme } from 'styles/theme'
import { getModalSelectDataCategories } from 'utils/modalSelecDataFormatter'
import { CoverDropzone } from './CoverDropzone'
import styles from './styles.module.scss'

interface ResourceFormProps {
  isCreateResource?: boolean
}

export function ResourceForm({ isCreateResource }: ResourceFormProps) {
  const { setCreateResourceOpened, setChangeResourceOpened } = useSidebar()

  const [categoryId, setCategoryId] = useState<string | null>(null)

  const resourceCategories = getModalSelectDataCategories(data.categories)

  const title = isCreateResource
    ? 'Cadastro de recurso'
    : 'Sugerir alteração de recurso'

  return (
    <Stack my="md" px="md" spacing="md">
      <Group align="start" position="apart" spacing={0}>
        <Title name={title} />
        <Back
          setSidebarOpened={
            isCreateResource ? setCreateResourceOpened : setChangeResourceOpened
          }
        />
      </Group>

      <Text>Informações do local</Text>

      <TextInput
        variant="filled"
        placeholder="Nome do recurso"
        label="Nome"
        radius="md"
        className={styles.input}
        required
      />

      <Select
        label="Categoria"
        required
        size="sm"
        placeholder="Selecione uma categoria"
        value={categoryId}
        variant="filled"
        onChange={setCategoryId}
        className={styles.select}
        maxDropdownHeight={300}
        rightSectionWidth={30}
        rightSection={
          <TbChevronDown size={14} color={myTheme.colors!.brand![0]} />
        }
        data={resourceCategories}
      />

      <TextInput
        variant="filled"
        placeholder="Endereço do recurso"
        label="Endereço"
        radius="md"
        className={styles.input}
        required
      />

      <Text mt={8}>Contato</Text>

      <TextInput
        variant="filled"
        placeholder="(00) 00000-0000"
        label="Número de telefone/celular"
        radius="md"
        className={styles.input}
      />

      <TextInput
        variant="filled"
        placeholder="Site do recurso"
        label="Site"
        radius="md"
        className={styles.input}
      />

      <InputWrapper
        label="Imagem de capa do recurso"
        required
        className={styles.input}
      >
        <CoverDropzone />
      </InputWrapper>

      <Buttons
        onCancel={() =>
          isCreateResource
            ? setCreateResourceOpened(false)
            : setChangeResourceOpened(false)
        }
        onConfirm={() =>
          isCreateResource
            ? setCreateResourceOpened(false)
            : setChangeResourceOpened(false)
        }
        onConfirmText="Enviar"
      />
    </Stack>
  )
}
