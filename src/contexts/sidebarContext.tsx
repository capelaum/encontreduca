import { createContext, ReactNode, useContext, useMemo, useState } from 'react'

interface SidebarProviderProps {
  children: ReactNode
}

interface SidebarContextData {
  menuOpened: boolean
  setMenuOpened: (menuOpened: boolean) => void
  profileOpened: boolean
  setProfileOpened: (profileOpened: boolean) => void
  resourceOpened: boolean
  setResourceOpened: (resourceOpened: boolean) => void
  changeResourceOpened: boolean
  setChangeResourceOpened: (changeResourceOpened: boolean) => void
  createResourceOpened: boolean
  setCreateResourceOpened: (createResourceOpened: boolean) => void
  savedResourcesOpened: boolean
  setSavedResourcesOpened: (savedResourcesOpened: boolean) => void
  votingPanelOpened: boolean
  setVotingPanelOpened: (votinPanelOpened: boolean) => void
  authSidebarOpened: boolean
  setAuthSidebarOpened: (authSidebarOpened: boolean) => void
}

const SidebarContext = createContext<SidebarContextData>(
  {} as SidebarContextData
)

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [menuOpened, setMenuOpened] = useState(false)
  const [profileOpened, setProfileOpened] = useState(false)
  const [resourceOpened, setResourceOpened] = useState(false)
  const [changeResourceOpened, setChangeResourceOpened] = useState(false)
  const [createResourceOpened, setCreateResourceOpened] = useState(false)
  const [savedResourcesOpened, setSavedResourcesOpened] = useState(false)
  const [votingPanelOpened, setVotingPanelOpened] = useState(false)
  const [authSidebarOpened, setAuthSidebarOpened] = useState(false)

  const sidebarContextProviderValues = {
    menuOpened,
    setMenuOpened,
    profileOpened,
    setProfileOpened,
    resourceOpened,
    setResourceOpened,
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
  }

  const sidebarContextProviderValue = useMemo<SidebarContextData>(
    () => ({ ...sidebarContextProviderValues }),
    Object.values(sidebarContextProviderValues)
  )

  return (
    <SidebarContext.Provider value={sidebarContextProviderValue}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = (): SidebarContextData => useContext(SidebarContext)
