import { useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { useModals } from '@mantine/modals'
import { useJsApiLoader } from '@react-google-maps/api'
import MapDark from 'components/Map/MapDark'
import { MapLight } from 'components/Map/MapLight'
import { MapLoader } from 'components/Map/MapLoader'
import { openModalConfirm } from 'components/Modals/ModalConfirrm'
import { ErrorView } from 'components/Shared/ErrorView'
import { useModalStyles } from 'components/Shared/styles/modalStyles'
import { showToast } from 'components/Shared/ToastMessage'
import { Sidebars } from 'components/Sidebars'
import { useAuth } from 'contexts/authContext'
import { useMap } from 'contexts/mapContext'
import { useResource } from 'contexts/resourceContext'
import { useSidebar } from 'contexts/sidebarContext'
import { hasCookie } from 'cookies-next'
import { loadCategories } from 'lib/loadCategories'
import { loadMotives } from 'lib/loadMotives'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { MdOutlineMarkEmailRead } from 'react-icons/md'
import { CategoryType } from 'types/categories'
import { libraries } from 'types/googleMaps'
import { Motive } from 'types/motives'

interface MapProps {
  categories: CategoryType[]
  motives: Motive[]
}

export default function Map({ categories, motives }: MapProps) {
  const router = useRouter()
  const { emailVerified, token, email, register, newEmailVerified } =
    router.query

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { openConfirmModal, closeModal } = useModals()
  const { classes } = useModalStyles(dark)

  const { user, setUser, getAuthUser, authUserCookieName } = useAuth()
  const { getUserLocation, setIsCurrentLocationAllowed } = useMap()

  const {
    setCategories,
    setMotives,
    resources,
    resourcesStatus,
    resourcesError
  } = useResource()

  const { setAuthSidebarOpened, setProfileOpened } = useSidebar()

  const handleGetCurrentLocation = () => {
    const isCurrentLocationAllowed = localStorage.getItem(
      'encontreduca_current_location_allowed'
    )

    if (isCurrentLocationAllowed && isCurrentLocationAllowed === 'true') {
      getUserLocation()
      setIsCurrentLocationAllowed(true)
    }

    if (!isCurrentLocationAllowed || isCurrentLocationAllowed !== 'true') {
      openModalConfirm({
        title: 'Permite acessar sua localização?',
        description:
          'Precisamos de sua permissão para saber o seu local atual.',
        onConfirm: () => {
          getUserLocation()
          setIsCurrentLocationAllowed(true)
          localStorage.setItem('encontreduca_current_location_allowed', 'true')
        },
        onCancel: () => {
          setIsCurrentLocationAllowed(false)
        },
        openConfirmModal,
        closeModal,
        classes,
        theme,
        dark
      })
    }
  }

  useEffect(() => {
    ;(async () => {
      if (hasCookie(authUserCookieName)) {
        const authUser = await getAuthUser()

        if (authUser) {
          setUser(authUser)
        }
      }
    })()

    handleGetCurrentLocation()
  }, [])

  useEffect(() => {
    setCategories(categories)
    setMotives(motives)

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

      {dark ? <MapDark /> : <MapLight resources={resources} />}

      <Sidebars />
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
