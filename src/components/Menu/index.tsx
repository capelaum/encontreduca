import { Space, Stack } from '@mantine/core'
import { useSidebar } from 'contexts/sidebarContext'
import { AiFillHome } from 'react-icons/ai'
import { BsBookmarksFill, BsPlusCircleFill } from 'react-icons/bs'
import { GiStarsStack } from 'react-icons/gi'
import { MdHelp, MdLogout } from 'react-icons/md'
import { MenuButton } from './MenuButton'
import { MenuProfile } from './MenuProfile'

export function Menu() {
  const { setProfileOpened } = useSidebar()

  return (
    <>
      <MenuProfile setProfileOpened={setProfileOpened} />

      <Space h="md" />

      <Stack spacing={0}>
        <MenuButton icon={<AiFillHome size={20} />} text="Home" />

        <MenuButton
          icon={<BsBookmarksFill size={20} />}
          text="Recursos salvos"
        />

        <MenuButton
          icon={<BsPlusCircleFill size={20} />}
          text="Cadastrar recurso"
        />

        <MenuButton
          icon={<GiStarsStack size={20} />}
          text="Painel de votação"
        />

        <MenuButton icon={<MdHelp size={20} />} text="Suporte" />

        <MenuButton icon={<MdLogout size={20} />} text="Sair" />
      </Stack>
    </>
  )
}
