import {
  Box,
  Group,
  Select,
  Stack,
  Text,
  TextInput,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useInputState } from '@mantine/hooks'
import { Back } from 'components/Shared/Back'
import { ConfirmButtons } from 'components/Shared/ConfirmButtons'
import { Title } from 'components/Shared/Title'
import { showToast } from 'components/Shared/ToastMessage'
import { useSidebar } from 'contexts/sidebarContext'
import data from 'data/categories.json'
import { useEffect } from 'react'
import { GiStarsStack } from 'react-icons/gi'
import { IoIosSend } from 'react-icons/io'
import { TbChevronDown } from 'react-icons/tb'
import { inputStyles } from 'styles/inputStyles'
import { getModalSelectDataCategories } from 'utils/modalSelecDataFormatter'
import { CoverDropzone } from './CoverDropzone'
import { Local } from './Local'

interface ResourceFormProps {
  isCreateResource?: boolean
}

export function ResourceForm({ isCreateResource }: ResourceFormProps) {
  const resourceCategories = getModalSelectDataCategories(data.categories)
  const { resource, setCreateResourceOpened, setChangeResourceOpened } =
    useSidebar()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

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
  }, [resource])

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
        sx={inputStyles(theme, dark)}
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
        variant="filled"
        placeholder="Endereço do recurso"
        label="Endereço"
        radius="md"
        onChange={setResourceAddress}
        value={resourceAddress ?? ''}
        sx={inputStyles(theme, dark)}
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
        sx={inputStyles(theme, dark)}
      />

      <TextInput
        variant="filled"
        placeholder="Site do recurso"
        label="Site"
        radius="md"
        onChange={setResourceWebsite}
        value={resourceWebsite ?? ''}
        sx={inputStyles(theme, dark)}
      />

      <Box>
        <Text
          pb={8}
          color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}
        >
          Imagem de capa do recurso{' '}
          <Text component="span" color={theme.colors.red[6]}>
            *
          </Text>
        </Text>
        <CoverDropzone />
      </Box>

      <ConfirmButtons
        onCancel={() => {
          setCreateResourceOpened(false)
          setChangeResourceOpened(false)
        }}
        onConfirm={() => {
          setCreateResourceOpened(false)
          setChangeResourceOpened(false)
          showToast({
            title: isCreateResource
              ? 'Recurso cadastrado com sucesso!'
              : 'Sugestão de alteração de recurso enviada!',
            description: isCreateResource
              ? 'Confira este recurso no Painel de votação.'
              : 'Agradecemos sua sugestão!',
            icon: isCreateResource ? (
              <GiStarsStack size={24} color={theme.colors.brand[8]} />
            ) : (
              <IoIosSend size={24} color={theme.colors.brand[8]} />
            ),
            dark
          })
        }}
        onConfirmText="Enviar"
      />
    </Stack>
  )
}
