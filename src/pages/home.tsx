import { Box, Container } from '@mantine/core'
import { Header } from 'components/Home/Header'
import { Hero } from 'components/Home/Sections/Hero'
import { Platform } from 'components/Home/Sections/Platform'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Encontreduca</title>
      </Head>

      <Header />

      <Box component="main">
        <Container size={1200} px={0} id="hero">
          <Hero />
        </Container>
        <Platform />
      </Box>

      <footer />
    </>
  )
}
