import { Space, Stack, useMantineColorScheme } from '@mantine/core'
import { useModals } from '@mantine/modals'
import { ModalSupport } from 'components/Modals/ModalSupport'
import { DefaultCloseButton } from 'components/Shared/Default/DefaultCloseButton'
import {
  modalStyles,
  useModalStyles
} from 'components/Shared/styles/modalStyles'
import { Title } from 'components/Shared/Title'
import { useResource } from 'contexts/resourceContext'
import { useSidebar } from 'contexts/sidebarContext'
import { useRouter } from 'next/router'
import { AiFillHome } from 'react-icons/ai'
import { BsBookmarksFill, BsPlusCircleFill } from 'react-icons/bs'
import { GiStarsStack } from 'react-icons/gi'
import { MdHelp, MdLogin, MdLogout } from 'react-icons/md'
import { MenuButton } from './MenuButton'
import { MenuProfile } from './MenuProfile'

export function Menu() {
  const router = useRouter()

  const {
    setMenuOpened,
    setProfileOpened,
    setCreateResourceOpened,
    setSavedResourcesOpened,
    setVotingPanelOpened,
    setResourceOpened
  } = useSidebar()

  const { user, setResource } = useResource()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { classes } = useModalStyles(dark)

  const { openModal, closeModal } = useModals()
  const openModalSupport = () => {
    const id = openModal({
      classNames: classes,
      ...modalStyles,
      overflow: 'outside',
      title: <Title name="Suporte" />,
      children: <ModalSupport onClose={() => closeModal(id)} />
    })
  }

  return (
    <>
      <DefaultCloseButton
        onClick={() => setMenuOpened(false)}
        title="Fechar modal"
      />

      <MenuProfile setProfileOpened={setProfileOpened} />

      <Space h="md" />

      <Stack spacing={0}>
        <MenuButton
          icon={<AiFillHome size={20} />}
          text="Home"
          onClick={() => {
            router.push('/home')
          }}
        />

        {user && (
          <>
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
                setResource(null)
                setResourceOpened(false)
                setCreateResourceOpened(true)
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

            <MenuButton
              icon={<MdHelp size={20} />}
              text="Suporte"
              onClick={openModalSupport}
            />

            <MenuButton icon={<MdLogout size={20} />} text="Sair" />
          </>
        )}

        {!user && (
          <MenuButton icon={<MdLogin size={20} />} text="Fazer login" />
        )}
      </Stack>
    </>
  )
}
