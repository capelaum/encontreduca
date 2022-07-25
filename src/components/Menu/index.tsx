import { Space, Stack } from '@mantine/core'
import { CloseButton } from 'components/Modal/Shared/CloseButton'
import { useSidebar } from 'contexts/sidebarContext'
import { AiFillHome } from 'react-icons/ai'
import { BsBookmarksFill, BsPlusCircleFill } from 'react-icons/bs'
import { GiStarsStack } from 'react-icons/gi'
import { MdHelp, MdLogout } from 'react-icons/md'
import { MenuButton } from './MenuButton'
import { MenuProfile } from './MenuProfile'

export function Menu() {
  const {
    setMenuOpened,
    setProfileOpened,
    setCreateResourceOpened,
    setSavedResourcesOpened,
    setVotingPanelOpened,
    setResource,
    setResourceOpened
  } = useSidebar()

  return (
    <>
      <CloseButton onClick={() => setMenuOpened(false)} />

      <MenuProfile setProfileOpened={setProfileOpened} />

      <Space h="md" />

      <Stack spacing={0}>
        <MenuButton icon={<AiFillHome size={20} />} text="Home" />

        <MenuButton
          icon={<BsBookmarksFill size={20} />}
          text="Recursos salvos"
          onClick={() => {
            setSavedResourcesOpened(true)
            setResourceOpened(false)
          }}
        />

        <MenuButton
          icon={<BsPlusCircleFill size={20} />}
          text="Cadastrar recurso"
          onClick={() => {
            setCreateResourceOpened(true)
            setResourceOpened(false)
            setResource(null)
          }}
        />

        <MenuButton
          icon={<GiStarsStack size={20} />}
          text="Painel de votação"
          onClick={() => {
            setVotingPanelOpened(true)
            setResourceOpened(false)
          }}
        />

        <MenuButton icon={<MdHelp size={20} />} text="Suporte" />

        <MenuButton icon={<MdLogout size={20} />} text="Sair" />
      </Stack>
    </>
  )
}
