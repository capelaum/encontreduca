import { useMantineColorScheme } from '@mantine/core'
import { useJsApiLoader } from '@react-google-maps/api'
import { useQuery } from '@tanstack/react-query'
import MapDark from 'components/Map/MapDark'
import { MapLight } from 'components/Map/MapLight'
import { MapLoader } from 'components/Map/MapLoader'
import { ErrorView } from 'components/Shared/ErrorView'
import { Sidebar } from 'components/Shared/Sidebar'
import { Menu } from 'components/Sidebars/Menu'
import { UpdateProfile } from 'components/Sidebars/Profile'
import { Resource } from 'components/Sidebars/Resource'
import { ResourceForm } from 'components/Sidebars/ResourceForm'
import { ResourceList } from 'components/Sidebars/ResourceList'
import { useSidebar } from 'contexts/sidebarContext'
import { loadCategories } from 'lib/loadCategories'
import { loadResources } from 'lib/loadResources'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { CategoryType } from 'types/categories'
import { libraries } from 'types/googleMaps'

interface MapProps {
  categories: CategoryType[]
}

export default function Map({ categories }: MapProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries
  })

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
    setVotingPanelOpened
  } = useSidebar()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const {
    data: resources,
    error: resourcesError,
    status: resourcesStatus
  } = useQuery(['resources'], loadResources)

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

  const reviews = resources.map((resource) => resource.reviews).flat()

  return (
    <>
      <Head>
        <title>Mapa | Encontreduca</title>
      </Head>

      {dark ? (
        <MapDark resources={resources!} categories={categories} />
      ) : (
        <MapLight resources={resources!} categories={categories} />
      )}

      <Sidebar
        opened={resourceOpened}
        setOpened={setResourceOpened}
        zIndex={savedResourcesOpened || votingPanelOpened ? 4 : 1}
      >
        <Resource reviews={reviews} />
      </Sidebar>

      <Sidebar opened={menuOpened} setOpened={setMenuOpened} zIndex={2}>
        <Menu />
      </Sidebar>

      <Sidebar
        opened={savedResourcesOpened}
        setOpened={setSavedResourcesOpened}
        zIndex={3}
      >
        <ResourceList resources={resources} />
      </Sidebar>

      <Sidebar
        opened={votingPanelOpened}
        setOpened={setVotingPanelOpened}
        zIndex={3}
      >
        <ResourceList isVotingPainel resources={resources} />
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
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const categories: CategoryType[] = await loadCategories()

  if (!categories) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      categories
    }
  }
}
