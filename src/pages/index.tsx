import { useJsApiLoader } from '@react-google-maps/api'
import Map from 'components/Map/Map'
import { MapLoader } from 'components/Map/MapLoader'
import { Search } from 'components/Map/Search'
import { Menu } from 'components/Menu'
import { Resource } from 'components/Resource'
import { Sidebar } from 'components/Shared/Sidebar'
import Head from 'next/head'
import { useState } from 'react'
import { ResourceType } from 'types/resources'

type Libraries =
  | 'places'
  | 'drawing'
  | 'geometry'
  | 'localContext'
  | 'visualization'

const libraries: Libraries[] = ['places']

export default function Home() {
  const [menuOpened, setMenuOpened] = useState(false)
  const [profileOpened, setProfileOpened] = useState(false)
  const [resourceOpened, setResourceOpened] = useState(false)
  const [resource, setResource] = useState<ResourceType>({} as ResourceType)

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

      <Search setMenuOpened={setMenuOpened} />

      <Map setResourceOpened={setResourceOpened} setResource={setResource} />

      <Sidebar opened={resourceOpened} setOpened={setResourceOpened}>
        <Search setMenuOpened={setMenuOpened} isResourceOpened />
        <Resource setResourceOpened={setResourceOpened} resource={resource} />
      </Sidebar>

      <Sidebar opened={menuOpened} setOpened={setMenuOpened}>
        <Menu setProfileOpened={setProfileOpened} />
      </Sidebar>

      <Sidebar opened={profileOpened} setOpened={setProfileOpened}>
        Profile
      </Sidebar>
    </>
  )
}
