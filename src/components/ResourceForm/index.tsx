import {
  Group,
  InputWrapper,
  Select,
  Stack,
  Text,
  TextInput
} from '@mantine/core'
import { useInputState } from '@mantine/hooks'
import { Back } from 'components/Shared/Back'
import { Buttons } from 'components/Shared/Buttons'
import { Title } from 'components/Shared/Title'
import { useSidebar } from 'contexts/sidebarContext'
import data from 'data/categories.json'
import { useEffect } from 'react'
import { TbChevronDown } from 'react-icons/tb'
import { myTheme } from 'styles/theme'
import { getModalSelectDataCategories } from 'utils/modalSelecDataFormatter'
import { CoverDropzone } from './CoverDropzone'
import { Local } from './Local'
import styles from './styles.module.scss'

interface ResourceFormProps {
  isCreateResource?: boolean
}

export function ResourceForm({ isCreateResource }: ResourceFormProps) {
  const resourceCategories = getModalSelectDataCategories(data.categories)
  const { resource, setCreateResourceOpened, setChangeResourceOpened } =
    useSidebar()

  const [categoryId, setCategoryId] = useInputState<string>('')
  const [resourceName, setResourceName] = useInputState<string>('')
  const [resourceAddress, setResourceAddress] = useInputState<string>('')
  const [resourcePhone, setResourcePhone] = useInputState<string>('')
  const [resourceWebsite, setResourceWebsite] = useInputState<string>('')

  useEffect(() => {
    if (resource) {
      setCategoryId(resource.categoryId.toString())
      setResourceName(resource.name)
      setResourceAddress(resource.address)
      setResourcePhone(resource.phone)
      setResourceWebsite(resource.website)
    }
  }, [])

  const title = isCreateResource
    ? 'Cadastro de recurso'
    : 'Sugerir alteração de recurso'

  return (
    <Stack my="md" px="md" spacing="md" role="form">
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
        onChange={setResourceName}
        value={resourceName}
        className={styles.input}
        required
      />

      <Select
        label="Categoria"
        required
        size="sm"
        placeholder="Selecione uma categoria"
        value={categoryId ?? ''}
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
        onChange={setResourceAddress}
        value={resourceAddress ?? ''}
        className={styles.input}
        required
      />

      <Local />

      <Text>Contato</Text>

      <TextInput
        variant="filled"
        placeholder="(00) 00000-0000"
        label="Número de telefone/celular"
        radius="md"
        onChange={setResourcePhone}
        value={resourcePhone ?? ''}
        className={styles.input}
      />

      <TextInput
        variant="filled"
        placeholder="Site do recurso"
        label="Site"
        radius="md"
        onChange={setResourceWebsite}
        value={resourceWebsite ?? ''}
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