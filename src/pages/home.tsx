import { Box, Container } from '@mantine/core'
import { Header } from 'components/Home/Header'
import { Hero } from 'components/Home/Sections/Hero'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Encontreduca</title>
      </Head>

      <Header />

      <Box component="main" mx={24}>
        <Container size={1200} px={0}>
          <Hero />
        </Container>
      </Box>

      <footer />
    </>
  )
}
