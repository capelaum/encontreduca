import {
  Button,
  Stack,
  TextInput,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useInputState } from '@mantine/hooks'
import { SidebarHeader } from 'components/Shared/SidebarHeader'
import { buttonStyles, inputStyles } from 'components/Shared/styles/inputStyles'
import { showToast } from 'components/Shared/ToastMessage'
import { useResource } from 'contexts/resourceContext'
import { useSidebar } from 'contexts/sidebarContext'
import { FaUserEdit } from 'react-icons/fa'
import { AvatarDropzone } from './AvatarDropzone'
import { DeleteUserButton } from './DeleteUserButton'

export function UpdateProfile() {
  const { setProfileOpened } = useSidebar()
  const { user } = useResource()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const [userName, setUserName] = useInputState(user?.name ?? '')
  const [userEmail, setUserEmail] = useInputState(user?.email ?? '')
  const [userPassword, setUserPassword] = useInputState('')
  const [userPasswordRepeat, setUserPasswordRepeat] = useInputState('')

  return (
    <Stack spacing="md" p="md">
      <SidebarHeader
        title="Perfil"
        closeSidebar={() => setProfileOpened(false)}
      />

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
