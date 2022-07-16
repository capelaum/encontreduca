import {
  Button,
  CSSObject,
  Group,
  MantineTheme,
  Stack,
  TextInput
} from '@mantine/core'
import { useInputState } from '@mantine/hooks'
import { Back } from 'components/Shared/Back'
import { Title } from 'components/Shared/Title'
import { useSidebar } from 'contexts/sidebarContext'
import { AvatarDropzone } from './AvatarDropzone'
import { DeleteUserButton } from './ModalUserDelete'

export function UpdateProfile() {
  const { setProfileOpened } = useSidebar()

  const [userName, setUserName] = useInputState('')
  const [userEmail, setUserEmail] = useInputState('')
  const [userCpf, setUserCpf] = useInputState('')
  const [userPassword, setUserPassword] = useInputState('')
  const [userPasswordRepeat, setUserPasswordRepeat] = useInputState('')

  const inputStyles = (theme: MantineTheme): CSSObject => ({
    input: {
      border: `1px solid ${theme.colors.cyan[4]}`
    },
    label: {
      color: theme.colors.cyan[4]
    },
    'input:focus': {
      outline: `1px solid white`
    }
  })

  return (
    <Stack spacing="md" p="md">
      <Group align="start" position="apart" spacing={0}>
        <Title name="Perfil" />
        <Back setSidebarOpened={setProfileOpened} />
      </Group>

      <AvatarDropzone />

      <TextInput
        variant="filled"
        radius="md"
        placeholder="Nome completo"
        label="Nome completo"
        onChange={setUserName}
        value={userName}
        required
        sx={inputStyles}
      />

      <TextInput
        type="email"
        variant="filled"
        radius="md"
        placeholder="Email"
        label="Email (necessário confirmar)"
        onChange={setUserEmail}
        value={userEmail}
        required
        sx={inputStyles}
      />

      <TextInput
        type="text"
        radius="md"
        variant="filled"
        placeholder="CPF"
        label="CPF"
        onChange={setUserCpf}
        value={userCpf}
        sx={inputStyles}
      />

      <TextInput
        type="password"
        radius="md"
        variant="filled"
        placeholder="Senha"
        label="Senha"
        onChange={setUserPassword}
        value={userPassword}
        sx={inputStyles}
      />

      <TextInput
        type="password"
        radius="md"
        variant="filled"
        placeholder="Repetir senha"
        label="Repetir senha"
        onChange={setUserPasswordRepeat}
        value={userPasswordRepeat}
        sx={inputStyles}
      />

      <Stack mt="sm" spacing="md">
        <Button
          size="sm"
          radius="md"
          variant="default"
          sx={(theme) => ({
            backgroundColor: theme.colors.cyan[3],
            color: theme.colors.brand[7],
            '&:hover': {
              backgroundColor: theme.colors.cyan[4]
            }
          })}
        >
          Atualizar
        </Button>

        <DeleteUserButton />
      </Stack>
    </Stack>
  )
}
