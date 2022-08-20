interface SeoProps {
  title: string
  description: string
  url: string
}

export function Seo({ title, description, url }: SeoProps) {
  return (
    <>
      <meta name="description" content={description} />
      <meta name="theme-color" content="#66d9e8" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />

      <meta property="og:site_name" content="Encontreduca" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:image" itemProp="image" content="images/Capa.png" />
      <meta property="og:image:type" content="image/png" />

      <meta name="twitter:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@capellett" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="images/Capa.pngimages/Capa.png" />
    </>
  )
}
