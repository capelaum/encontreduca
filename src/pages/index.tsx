import { useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { useJsApiLoader } from '@react-google-maps/api'
import MapDark from 'components/Map/MapDark'
import { MapLight } from 'components/Map/MapLight'
import { MapLoader } from 'components/Map/MapLoader'
import { ErrorView } from 'components/Shared/ErrorView'
import { showToast } from 'components/Shared/ToastMessage'
import { Sidebars } from 'components/Sidebars'
import { useAuth } from 'contexts/authContext'
import { useResource } from 'contexts/resourceContext'
import { useSidebar } from 'contexts/sidebarContext'
import { hasCookie } from 'cookies-next'
import { useGetCurrentLocation } from 'hooks/useGetCurrentLocation'
import { loadCategories } from 'lib/loadCategories'
import { loadMotives } from 'lib/loadMotives'
import { getAuthUser } from 'lib/usersLib'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { MdOutlineMarkEmailRead } from 'react-icons/md'
import { api } from 'services/api'
import { CategoryType } from 'types/categories'
import { libraries } from 'types/googleMaps'
import { Motive } from 'types/motives'
import { User } from 'types/users'

interface MapProps {
  categories: CategoryType[]
  motives: Motive[]
  authUser: User | null
}

export default function Map({ categories, motives, authUser }: MapProps) {
  const router = useRouter()
  const { emailVerified, token, email, register, newEmailVerified } =
    router.query

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { handleGetCurrentLocation } = useGetCurrentLocation()
  const { user, setUser } = useAuth()

  const {
    setCategories,
    setMotives,
    resources,
    resourcesStatus,
    resourcesError
  } = useResource()

  const { setAuthSidebarOpened, setProfileOpened } = useSidebar()

  useEffect(() => {
    setUser(authUser)
    setCategories(categories)
    setMotives(motives)

    handleGetCurrentLocation()

    if (newEmailVerified === 'true') {
      showToast({
        title: 'Seu novo email foi verificado com sucesso',
        description: 'Agora você pode fazer login com o novo email',
        icon: (
          <MdOutlineMarkEmailRead size={24} color={theme.colors.brand[7]} />
        ),
        dark
      })

      setProfileOpened(true)
    }

    if (
      (register === 'true' && !user) ||
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
      <ErrorView message="Ooops, houve um erro ao carregar os recursos educacionais 🥲" />
    )
  }

  if (!categories) {
    return (
      <ErrorView message="Ooops, houve um erro ao carregar as categorias educacionais 🥲" />
    )
  }

  return (
    <>
      <Head>
        <title>Mapa | Encontreduca</title>
      </Head>

      {dark ? <MapDark /> : <MapLight />}

      <Sidebars />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const categories: CategoryType[] = await loadCategories()
  const motives: Motive[] = await loadMotives()

  if (hasCookie('encontreduca_user_auth', { req, res })) {
    api.defaults.headers.common.Authorization = `Bearer ${req.cookies.encontreduca_user_auth}`
  }

  const authUser = hasCookie('encontreduca_user_auth', { req, res })
    ? await getAuthUser()
    : null

  if (!categories || !motives) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      categories,
      motives,
      authUser
    }
  }
}
