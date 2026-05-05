import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, url, type = 'website', image = '/og-image.jpg' }) => {
  const siteName = 'DAGAZ.DEV | Codando Como Vikings';
  const defaultDescription = 'DAGAZ.DEV - Codando como Vikings. Consultoria SAP e Desenvolvimento.';

  const seo = {
    title: title ? `${title} | DAGAZ.DEV` : siteName,
    description: description || defaultDescription,
    url: url ? `https://dagaz.dev${url}` : 'https://dagaz.dev/',
    type,
    image: image.startsWith('http') ? image : `https://dagaz.dev${image}`,
  };

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={seo.type} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={seo.url} />
      <meta property="twitter:title" content={seo.title} />
      <meta property="twitter:description" content={seo.description} />
      <meta property="twitter:image" content={seo.image} />
    </Helmet>
  );
};

export default SEO;
