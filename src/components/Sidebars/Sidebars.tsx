import { Sidebar } from 'components/Shared/Sidebar'
import { useSidebar } from 'contexts/sidebarContext'
import { SidebarAuth } from './SidebarAuth'
import { SidebarMenu } from './SidebarMenu'
import { SidebarProfile } from './SidebarProfile'
import { SidebarResource } from './SidebarResource'
import { SidebarResourceForm } from './SidebarResourceForm'
import { SidebarResourceList } from './SidebarResourceList'

export function Sidebars() {
  const {
    resourceOpened,
    setResourceOpened,
    menuOpened,
    setMenuOpened,
    profileOpened,
    setProfileOpened,
    changeResourceOpened,
    setChangeResourceOpened,
    createResourceOpened,
    setCreateResourceOpened,
    savedResourcesOpened,
    setSavedResourcesOpened,
    votingPanelOpened,
    setVotingPanelOpened,
    authSidebarOpened,
    setAuthSidebarOpened
  } = useSidebar()

  return (
    <>
      <Sidebar
        opened={resourceOpened}
        setOpened={setResourceOpened}
        zIndex={savedResourcesOpened || votingPanelOpened ? 4 : 1}
      >
        <SidebarResource />
      </Sidebar>

      <Sidebar opened={menuOpened} setOpened={setMenuOpened} zIndex={2}>
        <SidebarMenu />
      </Sidebar>

      <Sidebar
        opened={savedResourcesOpened}
        setOpened={setSavedResourcesOpened}
        zIndex={3}
      >
        <SidebarResourceList />
      </Sidebar>

      <Sidebar
        opened={votingPanelOpened}
        setOpened={setVotingPanelOpened}
        zIndex={3}
      >
        <SidebarResourceList isVotingPainel />
      </Sidebar>

      <Sidebar
        opened={changeResourceOpened}
        setOpened={setChangeResourceOpened}
        zIndex={4}
      >
        <SidebarResourceForm />
      </Sidebar>

      <Sidebar
        opened={createResourceOpened}
        setOpened={setCreateResourceOpened}
        zIndex={4}
      >
        <SidebarResourceForm isCreateResource />
      </Sidebar>

      <Sidebar opened={profileOpened} setOpened={setProfileOpened} zIndex={4}>
        <SidebarProfile />
      </Sidebar>

      <Sidebar
        opened={authSidebarOpened}
        setOpened={setAuthSidebarOpened}
        zIndex={4}
      >
        <SidebarAuth />
      </Sidebar>
    </>
  )
}
