import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Porta dinâmica para a Hostinger, com fallback para 3000 localmente
const PORT = process.env.PORT || 3000;

const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');
const markdownPath = path.join(distPath, 'index.md');
const sitemapPath = path.join(distPath, 'sitemap.xml');

const knownPagePaths = new Set([
  '/',
  '/sobre',
  '/blog',
  '/contato',
  '/privacidade',
  '/termos',
  '/links',
]);
const pageFallbacks = {
  '/sobre': {
    title: 'Sobre a Dagaz.Dev',
    description: 'Conheça a Dagaz.Dev, uma equipe de especialistas SAP, arquitetos de software e líderes técnicos.',
    body: '<p>Trabalhamos para levar sistemas legados à modernidade, do ABAP ao BTP, com soluções precisas e bem documentadas.</p><p><a href="/contato">Fale com a Dagaz.Dev</a></p>',
  },
  '/blog': {
    title: 'Insights SAP e desenvolvimento',
    description: 'Artigos sobre estratégias SAP, arquitetura limpa e liderança técnica.',
    body: '<p>A Forja de Insights reúne conteúdo técnico sobre SAP, desenvolvimento e carreira.</p>',
  },
  '/contato': {
    title: 'Contato Dagaz.Dev',
    description: 'Entre em contato para consultoria, mentoria e soluções SAP personalizadas.',
    body: '<p>E-mail: <a href="mailto:hello@dagaz.dev">hello@dagaz.dev</a></p>',
  },
  '/privacidade': {
    title: 'Política de Privacidade',
    description: 'Saiba como a Dagaz.Dev coleta, utiliza e protege dados enviados pelo site.',
    body: '<p>Usamos dados de contato para responder solicitações e dados analíticos para melhorar o site. Não vendemos dados pessoais.</p><p>Dúvidas: <a href="mailto:privacidade@dagaz.dev">privacidade@dagaz.dev</a>.</p>',
  },
  '/termos': {
    title: 'Termos de Uso',
    description: 'Termos de acesso e uso do conteúdo e dos serviços Dagaz.Dev.',
    body: '<p>O conteúdo, as marcas e os materiais publicados pertencem à Dagaz.Dev. Exemplos de código são educacionais e devem ser avaliados antes do uso em produção.</p>',
  },
  '/links': {
    title: 'Links oficiais Dagaz.Dev',
    description: 'Acesse o site e os perfis oficiais da Dagaz.Dev.',
    body: '<ul><li><a href="https://www.linkedin.com/company/dagaz-dev">LinkedIn</a></li><li><a href="https://www.instagram.com/dagaz.dev">Instagram</a></li><li><a href="https://github.com/dagaz-dev">GitHub</a></li></ul>',
  },
};
const articlePaths = new Set();
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  for (const [, articlePath] of sitemap.matchAll(/<loc>https:\/\/dagaz\.dev(\/artigo\/[^<]+)<\/loc>/g)) {
    articlePaths.add(decodeURIComponent(articlePath));
  }
}

// Log de inicialização para ajudar no diagnóstico via stderr.log
console.log(`[STARTUP] Iniciando servidor na porta ${PORT}...`);
console.log(`[STARTUP] __dirname atual: ${__dirname}`);

// Verificação de segurança para a pasta dist
if (!fs.existsSync(distPath)) {
  console.error(`[ERROR] Pasta "dist" não encontrada em: ${distPath}`);
  console.error(`[ERROR] Certifique-se de rodar "npm run build" antes do deploy ou enviar a pasta dist.`);
} else {
  console.log(`[SUCCESS] Pasta "dist" localizada.`);
}

app.use(express.json({ limit: '16kb' }));

app.use((req, res, next) => {
  if (req.path === '/') {
    res.set('Link', [
      '<https://dagaz.dev/llms.txt>; rel="describedby"; type="text/plain',
      '<https://dagaz.dev/index.md>; rel="alternate"; type="text/markdown',
    ].join(', '));
  }
  next();
});

app.get('/', (req, res, next) => {
  const markdownAccept = (req.get('accept') || '')
    .split(',')
    .map(value => value.trim())
    .find(value => /^text\/markdown(?:\s*;|$)/i.test(value));
  const quality = markdownAccept?.match(/;\s*q=([0-9.]+)/i)?.[1];

  if (markdownAccept && Number(quality ?? 1) > 0) {
    return res.type('text/markdown').sendFile(markdownPath);
  }
  next();
});

app.get('/.well-known/mcp/server-card.json', (req, res, next) => {
  res.sendFile(
    path.join(distPath, '.well-known', 'mcp', 'server-card.json'),
    { dotfiles: 'allow' },
    error => {
      if (error) next(error);
    }
  );
});

const businessProfile = {
  name: 'Dagaz.Dev',
  url: 'https://dagaz.dev/',
  description: 'Consultoria e desenvolvimento para modernização, integração e inovação em ambientes SAP.',
  email: 'hello@dagaz.dev',
  services: ['Estratégia SAP', 'ABAP', 'SAP Fiori', 'SAP BTP', 'Integração', 'Mentoria técnica'],
  socialProfiles: [
    'https://www.linkedin.com/company/dagaz-dev',
    'https://www.instagram.com/dagaz.dev',
    'https://github.com/dagaz-dev',
  ],
};

const toolDefinitions = [{
  name: 'get_business_profile',
  description: 'Get Dagaz.Dev business details, services, and contact links.',
  inputSchema: { type: 'object', properties: {}, additionalProperties: false },
}];

const escapeHtml = value => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

function renderAgentPage(requestPath, res) {
  const articleMatch = requestPath.match(/^\/artigo\/(.+)$/);
  const articleTitle = articleMatch?.[1]
    .split('/')
    .at(-1)
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  const page = pageFallbacks[requestPath] || (articleMatch ? {
    title: articleTitle,
    description: 'Artigo da Dagaz.Dev sobre SAP e desenvolvimento.',
    body: '<p>Leia mais artigos técnicos na <a href="/blog">Forja de Insights</a>.</p>',
  } : null);

  if (!page) {
    return res.sendFile(indexPath);
  }
  if (!fs.existsSync(indexPath)) {
    return res.status(404).send('Frontend não encontrado.');
  }

  const canonicalUrl = `https://dagaz.dev${encodeURI(requestPath)}`;
  let html = fs.readFileSync(indexPath, 'utf8');
  const title = `${page.title} | DAGAZ.DEV`;
  const description = escapeHtml(page.description);
  const canonical = escapeHtml(canonicalUrl);
  const renderedPage = `<main id="agent-content"><h1>${escapeHtml(page.title)}</h1><p>${description}</p>${page.body}</main>`;

  html = html
    .replace(/<main id="agent-content">[\s\S]*?<\/main>/, renderedPage)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${description}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/(<meta property="og:url" content=")[^"]*(" \/>)/, `$1${canonical}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(" \/>)/, `$1${escapeHtml(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(" \/>)/, `$1${description}$2`)
    .replace(/(<meta name="twitter:url" content=")[^"]*(" \/>)/, `$1${canonical}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(" \/>)/, `$1${escapeHtml(title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(" \/>)/, `$1${description}$2`);

  const structuredDataMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (structuredDataMatch) {
    const structuredData = JSON.parse(structuredDataMatch[1]);
    const webpage = structuredData['@graph'].find(node => node['@type'] === 'WebPage');
    webpage['@id'] = `${canonicalUrl}#webpage`;
    webpage.url = canonicalUrl;
    webpage.name = page.title;
    html = html.replace(structuredDataMatch[0], `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`);
  }

  res.type('html').send(html);
}

app.post('/mcp', (req, res) => {
  const { jsonrpc, id, method, params = {} } = req.body || {};
  const requestParams = params && typeof params === 'object' ? params : {};
  const respond = result => res.type('application/json').json({ jsonrpc: '2.0', id, result });
  const fail = (code, message) => res.type('application/json').json({
    jsonrpc: '2.0',
    id: id ?? null,
    error: { code, message },
  });

  if (jsonrpc !== '2.0' || typeof method !== 'string') {
    return fail(-32600, 'Invalid JSON-RPC request');
  }

  if (method === 'notifications/initialized') {
    return res.status(202).end();
  }
  if (method === 'initialize') {
    const supportedVersions = ['2025-11-25', '2025-06-18', '2025-03-26', '2024-11-05'];
    const protocolVersion = supportedVersions.includes(requestParams.protocolVersion)
      ? requestParams.protocolVersion
      : '2025-03-26';
    return respond({
      protocolVersion,
      capabilities: { tools: {} },
      serverInfo: { name: 'dagaz-dev', version: '1.0.0' },
    });
  }
  if (method === 'tools/list') {
    return respond({ tools: toolDefinitions });
  }
  if (method === 'tools/call') {
    if (requestParams.name !== 'get_business_profile') {
      return fail(-32602, `Unknown tool: ${requestParams.name}`);
    }
    return respond({
      content: [{ type: 'text', text: JSON.stringify(businessProfile) }],
      structuredContent: businessProfile,
    });
  }

  return fail(-32601, `Method not found: ${method}`);
});

app.all('/mcp', (req, res) => {
  res.set('Allow', 'POST').status(405).type('text').send('Method Not Allowed');
});

// Serve the pre-rendered Vite shell and its static assets.
app.use(express.static(distPath));

// Rota de Health Check para diagnóstico rápido (acessar /health-check)
app.get('/health-check', (req, res) => {
  res.status(200).json({
    status: 'up',
    port: PORT,
    distExists: fs.existsSync(distPath),
    indexExists: fs.existsSync(indexPath),
    time: new Date().toISOString()
  });
});

// Serve application routes only; unknown URLs must not look like successful pages.
app.get(/.*/, (req, res) => {
  let requestPath;
  try {
    requestPath = decodeURIComponent(req.path);
  } catch {
    return res.status(400).type('text').send('Invalid URL');
  }

  if (knownPagePaths.has(requestPath) || articlePaths.has(requestPath)) {
    renderAgentPage(requestPath, res);
  } else {
    res.status(404).type('html').send(`<!doctype html>
<html lang="pt"><head><meta charset="utf-8"><title>404 | Dagaz.Dev</title></head>
<body><main><h1>404 - Página não encontrada</h1>
<p>Não encontramos esta página na Dagaz.Dev.</p><a href="/">Voltar à página inicial</a></main></body></html>`);
  }
});

// Inicialização do servidor
const server = app.listen(PORT, () => {
  console.log(`[SUCCESS] Servidor rodando. Acesse http://localhost:${PORT}`);
});

// Tratamento de erros globais do servidor
server.on('error', (err) => {
  console.error('[SERVER CRITICAL ERROR]', err);
});
