import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  name?: string;
  type?: string;
  url?: string;
  image?: string;
  structuredData?: Record<string, any>;
}

export default function SEO({ title, description, name, type, url, image, structuredData }: SEOProps) {
  const siteTitle = 'Handmade Islamic Gifts | Serace Islamic Gifts';
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
  const defaultImage = 'https://i.etsystatic.com/24474694/r/il/89eeb7/4799657141/il_794xN.4799657141_3nko.jpg';
  
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name='description' content={description} />
      
      {/* OpenGraph tags */}
      <meta property='og:type' content={type || 'website'} />
      <meta property='og:title' content={fullTitle} />
      <meta property='og:description' content={description} />
      <meta property='og:url' content={url || window.location.href} />
      {/* Use provided image, or fallback to default */}
      <meta property='og:image' content={image || defaultImage} />

      {/* Twitter tags */}
      <meta name='twitter:creator' content={name || 'Serace Islamic Gifts'} />
      <meta name='twitter:card' content={type === 'article' || type === 'product' ? 'summary_large_image' : 'summary'} />
      <meta name='twitter:title' content={fullTitle} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image || defaultImage} />

      {/* Structured Data (JSON-LD) for Rich Snippets */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
