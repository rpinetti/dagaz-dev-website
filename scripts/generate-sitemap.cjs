const fs = require('fs');
const path = require('path');

/**
 * Script para gerar o sitemap.xml automaticamente com base nas rotas estáticas
 * e nos artigos dinâmicos do WordPress (cms.dagaz.dev).
 */

const SITE_URL = 'https://dagaz.dev';
const WP_API_URL = 'https://cms.dagaz.dev/wp-json/wp/v2/posts?per_page=100';

const staticRoutes = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/sobre', priority: '0.8', changefreq: 'monthly' },
  { url: '/blog', priority: '0.9', changefreq: 'weekly' },
  { url: '/contato', priority: '0.8', changefreq: 'monthly' },
  { url: '/privacidade', priority: '0.3', changefreq: 'monthly' },
  { url: '/termos', priority: '0.3', changefreq: 'monthly' },
];

async function generateSitemap() {
  let blogRoutes = [];
  
  try {
    console.log('Fetching blog post slugs from cms.dagaz.dev...');
    const response = await fetch(WP_API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch from WordPress API: ${response.statusText}`);
    }
    const posts = await response.json();
    
    if (Array.isArray(posts)) {
      blogRoutes = posts.map(post => ({
        url: `/artigo/${post.slug}`,
        priority: '0.6',
        changefreq: 'monthly'
      }));
      console.log(`✅ Loaded ${blogRoutes.length} blog routes from WordPress.`);
    }
  } catch (error) {
    console.error('⚠️ Warning: Could not fetch posts from WordPress API for sitemap. Using only static routes.', error.message);
  }

  const allRoutes = [...staticRoutes, ...blogRoutes];

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${SITE_URL}${route.url}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapContent);

  console.log(`✅ Sitemap gerado com sucesso em ${sitemapPath}`);
  console.log(`📊 Total de rotas: ${allRoutes.length}`);
}

generateSitemap();
