import { Center, CSSObject } from '@mantine/core'
import { DefaultAvatar } from 'components/Shared/DefaultAvatar'
import { DefaultDropzone } from 'components/Shared/DefaultDropzone'
import { useResource } from 'contexts/resourceContext'
import { useState } from 'react'

export function AvatarDropzone() {
  const { user } = useResource()

  const [avatarSrc, setAvatarSrc] = useState<string | null>(null)

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
        containerStyles={containerStyles}
        setImage={setAvatarSrc}
      >
        <DefaultAvatar avatarSrc={user?.avatar_url ?? avatarSrc} size={180} />
      </DefaultDropzone>
    </Center>
  )
}
