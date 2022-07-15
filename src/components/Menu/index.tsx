import { ActionIcon, Space, Stack } from '@mantine/core'
import { useSidebar } from 'contexts/sidebarContext'
import { AiFillHome } from 'react-icons/ai'
import { BsBookmarksFill, BsPlusCircleFill } from 'react-icons/bs'
import { GiStarsStack } from 'react-icons/gi'
import { MdClose, MdHelp, MdLogout } from 'react-icons/md'
import { myTheme } from 'styles/theme'
import { MenuButton } from './MenuButton'
import { MenuProfile } from './MenuProfile'

export function Menu() {
  const { setMenuOpened, setProfileOpened, setCreateResourceOpened } =
    useSidebar()

  return (
    <>
      <ActionIcon
        variant="hover"
        size="lg"
        color="brand"
        onClick={() => setMenuOpened(false)}
        title="Fechar Menu"
        sx={(theme) => ({
          color: theme.colors.cyan[3],
          position: 'absolute',
          top: theme.spacing.md,
          right: theme.spacing.md
        })}
      >
        <MdClose size={24} color={myTheme.colors!.brand![0]} />
      </ActionIcon>

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
          onClick={() => setCreateResourceOpened(true)}
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
