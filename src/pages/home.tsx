import { Box } from '@mantine/core'
import { Header } from 'components/Home/Header'
import { About } from 'components/Home/Sections/About'
import { Hero } from 'components/Home/Sections/Hero'
import { Platform } from 'components/Home/Sections/Platform'
import { Resources } from 'components/Home/Sections/Resources'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Encontreduca</title>
      </Head>

      <Header />

      <Box component="main">
        <Hero />
        <Platform />
        <Resources />
        <About />
      </Box>

      <footer />
    </>
  )
}
