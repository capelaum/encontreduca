import { Avatar, Box, Button, Image, Stack } from '@mantine/core'
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { useRef, useState } from 'react'
import { MdPhotoCamera } from 'react-icons/md'

export const dropzoneChildren = (
  status: DropzoneStatus,
  isAvatarUploaded: boolean
) => {
  if (isAvatarUploaded) {
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

export function AvatarDropzone() {
  const [isLoading, setIsLoading] = useState(false)
  const [isAvatarUploaded, setIsAvatarUploaded] = useState(false)

  const openRef = useRef<() => void>()

  const uploadAvatarImage = async (files: File[]) => {
    setIsLoading(true)

    console.log('🚀 ~ files', files)

    setTimeout(() => {
      setIsLoading(false)
      setIsAvatarUploaded(true)
    }, 3000)
  }

  return (
    <Stack my="md" spacing="md" align="center">
      <Dropzone
        radius={99}
        padding={0}
        name="userAvatar"
        openRef={openRef as any}
        loading={isLoading}
        accept={IMAGE_MIME_TYPE}
        onDrop={(files) => uploadAvatarImage(files)}
        onReject={(files) => console.log('rejected files', files)}
        sx={{
          border: 'none'
        }}
      >
        {(status) => dropzoneChildren(status, isAvatarUploaded)}
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
  )
}
