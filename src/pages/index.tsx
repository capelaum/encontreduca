import { useJsApiLoader } from '@react-google-maps/api'
import Map from 'components/Map/Map'
import { SideButtons } from 'components/Map/SideButtons'
import { Loader } from 'components/Shared/Loader'
import Head from 'next/head'

type Libraries =
  | 'places'
  | 'drawing'
  | 'geometry'
  | 'localContext'
  | 'visualization'

const libraries: Libraries[] = ['places']

export default function Home() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries
  })

  if (!isLoaded) return <Loader />

  return (
    <>
      <Head>
        <title>React Google Maps</title>
        <meta name="description" content="React Google Maps" />
      </Head>

      <Map />
      <SideButtons />
    </>
  )
}
