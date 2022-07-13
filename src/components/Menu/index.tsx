import { Space, Stack } from '@mantine/core'
import { AiFillHome } from 'react-icons/ai'
import { BsBookmarksFill, BsPlusCircleFill } from 'react-icons/bs'
import { GiStarsStack } from 'react-icons/gi'
import { MdHelp, MdLogout } from 'react-icons/md'
import { MenuButton } from './MenuButton'
import { MenuProfile } from './MenuProfile'

export function Menu() {
  return (
    <>
      <MenuProfile />

      <Space h="md" />

      <Stack spacing={0}>
        <MenuButton icon={<AiFillHome size={24} />} text="Home" />

        <MenuButton
          icon={<BsBookmarksFill size={24} />}
          text="Recursos salvos"
        />

        <MenuButton
          icon={<BsPlusCircleFill size={24} />}
          text="Cadastrar recurso"
        />

        <MenuButton
          icon={<GiStarsStack size={24} />}
          text="Painel de votação"
        />

        <MenuButton icon={<MdHelp size={24} />} text="Suporte" />

        <MenuButton icon={<MdLogout size={24} />} text="Sair" />
      </Stack>
    </>
  )
}
