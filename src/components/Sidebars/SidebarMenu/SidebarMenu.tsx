import { Box, Space, Stack, useMantineColorScheme } from '@mantine/core'
import { useModals } from '@mantine/modals'
import { ModalSupport } from 'components/Modals'
import { DefaultCloseButton } from 'components/Shared/Default/DefaultCloseButton'
import { Title } from 'components/Shared/Title'
import { useAuth } from 'contexts/authContext'
import { useResource } from 'contexts/resourceContext'
import { useSidebar } from 'contexts/sidebarContext'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { AiFillHome } from 'react-icons/ai'
import { BsBookmarksFill, BsPlusCircleFill } from 'react-icons/bs'
import { GiStarsStack } from 'react-icons/gi'
import { MdHelp, MdLogin, MdLogout } from 'react-icons/md'
import { modalStyles, useModalStyles } from 'styles/modalStyles'
import { Copy } from './Copy'
import { MenuButton } from './MenuButton'
import { MenuProfile } from './MenuProfile'

export function SidebarMenu() {
  const router = useRouter()

  const {
    setMenuOpened,
    setProfileOpened,
    setCreateResourceOpened,
    setSavedResourcesOpened,
    setVotingPanelOpened,
    setResourceOpened,
    setAuthSidebarOpened
  } = useSidebar()

  const { setResource } = useResource()
  const { user, logout } = useAuth()

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
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <DefaultCloseButton
        onClick={() => setMenuOpened(false)}
        title="Fechar modal"
      />

      <MenuProfile setProfileOpened={setProfileOpened} />

      <Space h="md" />

      <Stack spacing={0} sx={{ flex: 1 }} justify="space-between">
        <Stack spacing={0}>
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

              <MenuButton
                icon={<MdLogout size={20} />}
                text="Sair"
                onClick={async () => {
                  await logout()
                  await signOut({ redirect: false })
                }}
              />
            </>
          )}

          <MenuButton
            icon={<AiFillHome size={20} />}
            text="Home"
            onClick={() => {
              router.push('/home')
            }}
          />

          {!user && (
            <MenuButton
              icon={<MdLogin size={20} />}
              text="Fazer login"
              onClick={() => {
                setAuthSidebarOpened(true)
              }}
            />
          )}
        </Stack>

        <Copy />
      </Stack>
    </Box>
  )
}
