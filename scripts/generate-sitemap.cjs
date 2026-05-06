const fs = require('fs');
const path = require('path');
const glob = require('glob');

/**
 * Script para gerar o sitemap.xml automaticamente com base nas rotas estáticas
 * e nos artigos do blog (arquivos MDX).
 */

const SITE_URL = 'https://dagaz.dev';

const staticRoutes = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/sobre', priority: '0.8', changefreq: 'monthly' },
  { url: '/blog', priority: '0.9', changefreq: 'weekly' },
  { url: '/contato', priority: '0.8', changefreq: 'monthly' },
  { url: '/privacidade', priority: '0.3', changefreq: 'monthly' },
  { url: '/termos', priority: '0.3', changefreq: 'monthly' },
];

// Encontrar todos os arquivos MDX do blog
const blogFiles = glob.sync('src/content/blog/**/*.mdx');
const blogRoutes = blogFiles.map(file => {
  const fileName = path.basename(file, '.mdx');
  return {
    url: `/artigo/${fileName}`,
    priority: '0.6',
    changefreq: 'monthly'
  };
});

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
