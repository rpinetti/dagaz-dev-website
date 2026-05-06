import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SEO = ({ title, description, url, type = 'website', image = '/og-image.jpg' }) => {
  const { i18n } = useTranslation();
  const siteName = 'DAGAZ.DEV | Codando Como Vikings';
  const defaultDescription = 'DAGAZ.DEV - Codando como Vikings. Consultoria SAP e Desenvolvimento.';
  const currentLang = i18n.language || 'pt';

  const seo = {
    title: title ? `${title} | DAGAZ.DEV` : siteName,
    description: description || defaultDescription,
    url: url ? `https://dagaz.dev${url}` : 'https://dagaz.dev/',
    type,
    image: image.startsWith('http') ? image : `https://dagaz.dev${image}`,
    locale: currentLang === 'en' ? 'en_US' : currentLang === 'es' ? 'es_ES' : 'pt_BR',
  };

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={seo.url} />

      {/* Open Graph / Facebook / LinkedIn / Instagram */}
      <meta property="og:type" content={seo.type} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:site_name" content="DAGAZ.DEV" />
      <meta property="og:locale" content={seo.locale} />
      
      {/* LinkedIn specific */}
      <meta name="author" content="Caio Dagaz" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:site" content="@dagazdev" />
    </Helmet>
  );
};

export default SEO;
