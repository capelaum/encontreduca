import { Center, CSSObject } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { DefaultAvatar } from 'components/Shared/DefaultAvatar'
import { DefaultDropzone } from 'components/Shared/DefaultDropzone'
import { useResource } from 'contexts/resourceContext'
import { useEffect, useState } from 'react'
import { ResourceFormValues } from 'types/resources'
import { ProfileFormValues } from 'types/users'

interface AvatarDropzoneProps {
  form: UseFormReturnType<ProfileFormValues>
  setHasPreview: (hasPreview: boolean) => void
  setImageBase64: (image: string | ArrayBuffer | null) => void
}

export function AvatarDropzone({
  form,
  setHasPreview,
  setImageBase64
}: AvatarDropzoneProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const { user } = useResource()

  useEffect(() => {
    if (preview) {
      setHasPreview(true)
    }
  }, [preview])

  const containerStyles = (): CSSObject => ({
    borderRadius: 999,
    width: 180,
    height: 180
  })

  return (
    <Center>
      <DefaultDropzone
        name="avatar"
        radius={999}
        form={form as UseFormReturnType<ResourceFormValues | ProfileFormValues>}
        setPreview={setPreview}
        setImageBase64={setImageBase64}
        containerStyles={containerStyles}
      >
        <DefaultAvatar avatarSrc={preview ?? user?.avatar_url} size={180} />
      </DefaultDropzone>
    </Center>
  )
}
