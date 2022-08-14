import { Sidebar } from 'components/Shared/Sidebar'
import { useSidebar } from 'contexts/sidebarContext'
import { AuthSidebar } from './AuthSidebar'
import { Menu } from './Menu'
import { UpdateProfile } from './Profile'
import { Resource } from './Resource'
import { ResourceForm } from './ResourceForm'
import { ResourceList } from './ResourceList'

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
        <Resource />
      </Sidebar>

      <Sidebar opened={menuOpened} setOpened={setMenuOpened} zIndex={2}>
        <Menu />
      </Sidebar>

      <Sidebar
        opened={savedResourcesOpened}
        setOpened={setSavedResourcesOpened}
        zIndex={3}
      >
        <ResourceList />
      </Sidebar>

      <Sidebar
        opened={votingPanelOpened}
        setOpened={setVotingPanelOpened}
        zIndex={3}
      >
        <ResourceList isVotingPainel />
      </Sidebar>

      <Sidebar
        opened={changeResourceOpened}
        setOpened={setChangeResourceOpened}
        zIndex={4}
      >
        <ResourceForm />
      </Sidebar>

      <Sidebar
        opened={createResourceOpened}
        setOpened={setCreateResourceOpened}
        zIndex={4}
      >
        <ResourceForm isCreateResource />
      </Sidebar>

      <Sidebar opened={profileOpened} setOpened={setProfileOpened} zIndex={4}>
        <UpdateProfile />
      </Sidebar>

      <Sidebar
        opened={authSidebarOpened}
        setOpened={setAuthSidebarOpened}
        zIndex={4}
      >
        <AuthSidebar />
      </Sidebar>
    </>
  )
}
