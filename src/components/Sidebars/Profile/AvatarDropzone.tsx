import { Center, CSSObject } from '@mantine/core'
import { DefaultAvatar } from 'components/Shared/DefaultAvatar'
import { DefaultDropzone } from 'components/Shared/DefaultDropzone'
import { useState } from 'react'

export function AvatarDropzone() {
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
        <DefaultAvatar avatarSrc={avatarSrc} size={180} />
      </DefaultDropzone>
    </Center>
  )
}
