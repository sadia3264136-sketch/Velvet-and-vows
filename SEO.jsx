import { Helmet } from 'react-helmet-async'

// Update this once the site has a real domain — used to build absolute
// canonical + Open Graph URLs. Safe to leave as-is; relative behavior
// still works, but search engines strongly prefer absolute canonical URLs.
export const SITE_URL = 'https://velvetandvows.vercel.app'
export const SITE_NAME = 'Velvet & Vows'

export default function SEO({
  title,
  description,
  path = '/',
  image = `${SITE_URL}/og-image.jpg`,
  noindex = false,
  jsonLd = null,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const url = `${SITE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  )
}
