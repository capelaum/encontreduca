import { useMantineColorScheme } from '@mantine/core'
import { useJsApiLoader } from '@react-google-maps/api'
import Map from 'components/Map/Map'
import MapLight from 'components/Map/MapLight'
import { MapLoader } from 'components/Map/MapLoader'
import { Menu } from 'components/Menu'
import { Resource } from 'components/Resource'
import { Back } from 'components/Resource/Header/Back'
import { Sidebar } from 'components/Shared/Sidebar'
import { Title } from 'components/Shared/Title'
import { useSidebar } from 'contexts/sidebarContext'
import Head from 'next/head'
import { Libraries } from 'types/googleMaps'

const libraries: Libraries[] = ['places']

export default function Home() {
  const {
    resourceOpened,
    setResourceOpened,
    menuOpened,
    setMenuOpened,
    profileOpened,
    setProfileOpened,
    changeResourceOpened,
    setChangeResourceOpened
  } = useSidebar()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries
  })

  if (!isLoaded) return <MapLoader />

  return (
    <>
      <Head>
        <title>Mapa | Encontreduca</title>
        <meta name="description" content="Mapa | Encontreduca" />
      </Head>

      {dark ? <Map /> : <MapLight />}

      <Sidebar opened={resourceOpened} setOpened={setResourceOpened}>
        <Resource />
      </Sidebar>

      <Sidebar
        opened={changeResourceOpened}
        setOpened={setChangeResourceOpened}
      >
        <Title name="Sugerir alteração de recurso" />
        <Back setSidebarOpened={setChangeResourceOpened} />
      </Sidebar>

      <Sidebar opened={menuOpened} setOpened={setMenuOpened}>
        <Menu />
      </Sidebar>

      <Sidebar opened={profileOpened} setOpened={setProfileOpened}>
        Profile
      </Sidebar>
    </>
  )
}
