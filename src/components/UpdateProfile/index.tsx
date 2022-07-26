import {
  Button,
  Group,
  Stack,
  TextInput,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useInputState } from '@mantine/hooks'
import { Back } from 'components/Shared/Back'
import { Title } from 'components/Shared/Title'
import { showToast } from 'components/ToastMessage'
import { useSidebar } from 'contexts/sidebarContext'
import { FaUserEdit } from 'react-icons/fa'
import { buttonStyles, inputStyles } from 'styles/inputStyles'
import { AvatarDropzone } from './AvatarDropzone'
import { DeleteUserButton } from './DeleteUserButton'

export function UpdateProfile() {
  const { setProfileOpened } = useSidebar()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const [userName, setUserName] = useInputState('')
  const [userEmail, setUserEmail] = useInputState('')
  const [userCpf, setUserCpf] = useInputState('')
  const [userPassword, setUserPassword] = useInputState('')
  const [userPasswordRepeat, setUserPasswordRepeat] = useInputState('')

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
        sx={inputStyles(theme, dark)}
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
        sx={inputStyles(theme, dark)}
      />

      <TextInput
        type="text"
        radius="md"
        variant="filled"
        placeholder="CPF"
        label="CPF"
        onChange={setUserCpf}
        value={userCpf}
        sx={inputStyles(theme, dark)}
      />

      <TextInput
        type="password"
        radius="md"
        variant="filled"
        placeholder="Senha"
        label="Senha"
        onChange={setUserPassword}
        value={userPassword}
        sx={inputStyles(theme, dark)}
      />

      <TextInput
        type="password"
        radius="md"
        variant="filled"
        placeholder="Repetir senha"
        label="Repetir senha"
        onChange={setUserPasswordRepeat}
        value={userPasswordRepeat}
        sx={inputStyles(theme, dark)}
      />

      <Stack mt="sm" spacing="md">
        <Button
          size="sm"
          radius="md"
          variant="default"
          sx={buttonStyles(theme, dark)}
          onClick={() => {
            showToast({
              title: 'Usuário atualizado com sucesso!',
              description: 'Mantenha sempre seu perfil atualizado!',
              icon: <FaUserEdit size={24} color={theme.colors.brand[7]} />,
              dark
            })
          }}
        >
          Atualizar
        </Button>

        <DeleteUserButton />
      </Stack>
    </Stack>
  )
}
