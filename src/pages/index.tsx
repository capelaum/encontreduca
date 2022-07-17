import { useMantineColorScheme } from '@mantine/core'
import { useJsApiLoader } from '@react-google-maps/api'
import Map from 'components/Map/Map'
import MapLight from 'components/Map/MapLight'
import { MapLoader } from 'components/Map/MapLoader'
import { Menu } from 'components/Menu'
import { Resource } from 'components/Resource'
import { ResourceForm } from 'components/ResourceForm'
import { ResourceList } from 'components/ResourceList'
import { Sidebar } from 'components/Shared/Sidebar'
import { UpdateProfile } from 'components/UpdateProfile'
import { useSidebar } from 'contexts/sidebarContext'
import Head from 'next/head'

export default function Home() {
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
    setSavedResourcesOpened
  } = useSidebar()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places']
  })

  if (!isLoaded) return <MapLoader />

  return (
    <>
      <Head>
        <title>Mapa | Encontreduca</title>
        <meta name="description" content="Mapa | Encontreduca" />
      </Head>

      {dark ? <Map /> : <MapLight />}

      <Sidebar
        opened={resourceOpened}
        setOpened={setResourceOpened}
        zIndex={savedResourcesOpened && !menuOpened ? 4 : 1}
      >
        <Resource />
      </Sidebar>

      <Sidebar opened={menuOpened} setOpened={setMenuOpened} zIndex={3}>
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
        opened={changeResourceOpened}
        setOpened={setChangeResourceOpened}
        zIndex={4}
      >
        <ResourceForm />
      </Sidebar>

      <Sidebar
        opened={createResourceOpened}
        setOpened={setCreateResourceOpened}
        zIndex={10}
      >
        <ResourceForm isCreateResource />
      </Sidebar>

      <Sidebar opened={profileOpened} setOpened={setProfileOpened} zIndex={10}>
        <UpdateProfile />
      </Sidebar>
    </>
  )
}
