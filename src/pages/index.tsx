import { useMantineColorScheme } from '@mantine/core'
import { useJsApiLoader } from '@react-google-maps/api'
import MapDark from 'components/Map/MapDark'
import { MapLight } from 'components/Map/MapLight'
import { MapLoader } from 'components/Map/MapLoader'
import { ErrorView } from 'components/Shared/ErrorView'
import { Sidebar } from 'components/Shared/Sidebar'
import { AuthSidebar } from 'components/Sidebars/AuthSidebar'
import { Menu } from 'components/Sidebars/Menu'
import { UpdateProfile } from 'components/Sidebars/Profile'
import { Resource } from 'components/Sidebars/Resource'
import { ResourceForm } from 'components/Sidebars/ResourceForm'
import { ResourceList } from 'components/Sidebars/ResourceList'
import { useAuth } from 'contexts/authContext'
import { useResource } from 'contexts/resourceContext'
import { useSidebar } from 'contexts/sidebarContext'
import { loadCategories } from 'lib/loadCategories'
import { loadMotives } from 'lib/loadMotives'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { CategoryType } from 'types/categories'
import { libraries } from 'types/googleMaps'
import { Motive } from 'types/motives'

interface MapProps {
  categories: CategoryType[]
  motives: Motive[]
}

export default function Map({ categories, motives }: MapProps) {
  const router = useRouter()
  const { emailVerified, token, email } = router.query

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { user } = useAuth()

  const {
    setCategories,
    setMotives,
    resources,
    resourcesStatus,
    resourcesError
  } = useResource()

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

  useEffect(() => {
    setCategories(categories)
    setMotives(motives)

    if (
      emailVerified === 'true' ||
      emailVerified === 'already' ||
      (token && email && !user)
    ) {
      setAuthSidebarOpened(true)
    }
  }, [])

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries
  })

  if (resourcesStatus === 'loading' || !isLoaded) {
    return <MapLoader />
  }

  if (resourcesStatus === 'error' && resourcesError instanceof Error) {
    return <ErrorView message={resourcesError.message} />
  }

  if (!resources) {
    return (
      <ErrorView message="Ooops, houve um erro ao carregar os recursos 🥲" />
    )
  }

  if (!categories) {
    return (
      <ErrorView message="Ooops, houve um erro ao carregar as categorias 🥲" />
    )
  }

  return (
    <>
      <Head>
        <title>Mapa | Encontreduca</title>
      </Head>

      {dark ? <MapDark /> : <MapLight resources={resources} />}

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

export const getServerSideProps: GetServerSideProps = async () => {
  const categories: CategoryType[] = await loadCategories()
  const motives: Motive[] = await loadMotives()

  if (!categories || !motives) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      categories,
      motives
    }
  }
}
