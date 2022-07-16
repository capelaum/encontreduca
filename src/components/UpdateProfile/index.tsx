import {
  Avatar,
  Box,
  Button,
  CSSObject,
  Group,
  Image,
  MantineTheme,
  Stack,
  Text,
  TextInput
} from '@mantine/core'
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { useInputState } from '@mantine/hooks'
import { useModals } from '@mantine/modals'
import { CloseButton } from 'components/Modal/Shared/CloseButton'
import { Back } from 'components/Shared/Back'
import { Title } from 'components/Shared/Title'
import { useSidebar } from 'contexts/sidebarContext'
import { useRef, useState } from 'react'
import { BsExclamationCircle } from 'react-icons/bs'
import { MdPhotoCamera } from 'react-icons/md'

export const dropzoneChildren = (
  status: DropzoneStatus,
  isCoverUploaded: boolean
) => {
  if (isCoverUploaded) {
    return (
      <Box>
        <Image
          radius={99}
          width="120px"
          height="120px"
          src="https://dummyimage.com/380x200/333/fff"
          alt="Imagem do usuário"
          title="Imagem do usuário"
        />
      </Box>
    )
  }

  return <Avatar size={120} radius="xl" src="/avatar.png" />
}

export function UpdateProfile() {
  const { setProfileOpened } = useSidebar()
  const { openConfirmModal, closeModal } = useModals()

  const [userName, setUserName] = useInputState('')
  const [userEmail, setUserEmail] = useInputState('')
  const [userCpf, setUserCpf] = useInputState('')
  const [userPassword, setUserPassword] = useInputState('')
  const [userPasswordRepeat, setUserPasswordRepeat] = useInputState('')

  const [isLoading, setIsLoading] = useState(false)
  const [isCoverUploaded, setIsCoverUploaded] = useState(false)

  const openRef = useRef<() => void>()

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

  const openModalUserDelete = () => {
    const id = openConfirmModal({
      radius: 'md',
      centered: true,
      withCloseButton: false,
      padding: 'md',
      title: <Title name="Quer mesmo excluir sua conta?" />,
      children: (
        <>
          <CloseButton onClick={() => closeModal(id)} />
          <Text>Não é possível recuperar sua conta após a exclusão!</Text>
        </>
      ),
      labels: { confirm: 'Confirmar', cancel: 'Cancelar' },
      cancelProps: {
        size: 'sm',
        radius: 'md',
        variant: 'outline'
      },
      confirmProps: {
        size: 'sm',
        radius: 'md',
        variant: 'default',
        sx: (theme) => ({
          backgroundColor: theme.colors.cyan[3],
          color: theme.colors.brand[7],
          '&:hover': {
            backgroundColor: theme.colors.cyan[4]
          }
        })
      },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => console.log('Confirmed')
    })
  }

  const uploadCoverImage = async (files: File[]) => {
    console.log('🚀 ~ files', files)
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      setIsCoverUploaded(true)
    }, 3000)
  }

  return (
    <Stack spacing="md" p="md">
      <Group align="start" position="apart" spacing={0}>
        <Title name="Perfil" />
        <Back setSidebarOpened={setProfileOpened} />
      </Group>

      <Stack spacing="md" align="center">
        <Dropzone
          radius={99}
          padding={0}
          name="userAvatar"
          openRef={openRef as any}
          loading={isLoading}
          accept={IMAGE_MIME_TYPE}
          onDrop={(files) => uploadCoverImage(files)}
          onReject={(files) => console.log('rejected files', files)}
          sx={{
            border: 'none'
          }}
        >
          {(status) => dropzoneChildren(status, isCoverUploaded)}
        </Dropzone>

        <Button
          size="sm"
          radius="md"
          variant="default"
          onClick={() => openRef.current!()}
          leftIcon={<MdPhotoCamera size={20} />}
          sx={(theme) => ({
            backgroundColor: theme.colors.cyan[3],
            color: theme.colors.brand[7],
            '&:hover': {
              backgroundColor: theme.colors.cyan[4]
            }
          })}
        >
          Alterar foto de perfil
        </Button>
      </Stack>

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

      <Stack mt="md" align="center">
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

        <Button
          size="sm"
          radius="md"
          variant="default"
          leftIcon={<BsExclamationCircle size={18} />}
          onClick={openModalUserDelete}
          sx={(theme) => ({
            backgroundColor: theme.colors.red[8],
            color: 'white',
            '&:hover': {
              backgroundColor: theme.colors.red[9]
            }
          })}
        >
          Excluir conta
        </Button>
      </Stack>
    </Stack>
  )
}
