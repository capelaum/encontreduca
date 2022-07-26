import { createGetInitialProps } from '@mantine/next'
import { Favicon } from 'components/Head/Favicon'
import { Seo } from 'components/Head/Seo'
import Document, { Head, Html, Main, NextScript } from 'next/document'

const getInitialProps = createGetInitialProps()

export default class MyDocument extends Document {
  static getInitialProps = getInitialProps

  render() {
    return (
      <Html lang="pt-BR" itemScope itemType="https://schema.org/WebSite">
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            cross-origin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
            rel="stylesheet"
          />

          <Favicon />

          <Seo
            title="Encontreduca - Encontre recursos educacionais"
            url="https://encontreduca.com.br"
            description="Use o mapa interativos e encontre os recursos educacionas mais próximos!"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
