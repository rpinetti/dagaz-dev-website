/**
 * scripts/bundle-blog.js
 *
 * Roda antes do build (e do dev server). Lê todos os .md de
 * public/content/blog/, extrai o frontmatter e o corpo, e gera:
 *
 *   - src/data/blogContent.js   → conteúdo embutido no bundle (elimina fetch runtime)
 *   - src/data/blog.json        → metadados usados pelo Article.jsx (build-time)
 *   - public/content/blog.json  → metadados usados pelo Blog.jsx (runtime fetch)
 *
 * Uso: node scripts/bundle-blog.js
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync } from 'fs';
import { join, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const BLOG_DIR      = join(ROOT, 'public', 'content', 'blog');
const CONTENT_OUT   = join(ROOT, 'src', 'data', 'blogContent.js');
const SRC_META_OUT  = join(ROOT, 'src', 'data', 'blog.json');
const PUB_META_OUT  = join(ROOT, 'public', 'content', 'blog.json');

// ── Parser de frontmatter inline (sem dependências extras) ────────────────────
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };

  const yamlBlock = match[1];
  const body      = match[2].trimStart();
  const meta      = {};

  for (const line of yamlBlock.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const val = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '');
    // Tenta converter números
    meta[key] = isNaN(val) || val === '' ? val : Number(val);
  }

  return { meta, body };
}

// ── Lê posts de um diretório de idioma ────────────────────────────────────────
function readLangDir(langDir, lang) {
  if (!existsSync(langDir)) return { posts: [], content: {} };

  const files   = readdirSync(langDir).filter(f => f.endsWith('.md'));
  const posts   = [];
  const content = {};

  for (const file of files) {
    const slug    = basename(file, '.md');
    const raw     = readFileSync(join(langDir, file), 'utf-8');
    const { meta, body } = parseFrontmatter(raw);

    posts.push({
      id:          slug,
      title:       meta.title       || slug,
      date:        meta.date        || '',
      author:      meta.author      || '',
      category:    meta.category    || '',
      categoryKey: meta.categoryKey || (meta.category || '').toLowerCase(),
      readingTime: meta.readingTime || 1,
      summary:     meta.summary     || meta.desc || '',
      desc:        meta.desc        || meta.summary || '',
      image:       meta.image       || '',
      contentFile: `/content/blog/${lang}/${file}`,
    });

    content[`${lang}/${slug}`] = body;
  }

  return { posts, content };
}

// ── Main ──────────────────────────────────────────────────────────────────────
function main() {
  const LANGS    = ['pt', 'en', 'es'];
  const blogMeta = {};
  const allContent = {};

  for (const lang of LANGS) {
    const { posts, content } = readLangDir(join(BLOG_DIR, lang), lang);
    blogMeta[lang] = posts;
    Object.assign(allContent, content);
  }

  const totalPosts   = Object.values(blogMeta).flat().length;
  const totalContent = Object.keys(allContent).length;

  // 1. public/content/blog.json  (runtime — Blog.jsx)
  writeFileSync(PUB_META_OUT, JSON.stringify(blogMeta, null, 2), 'utf-8');

  // 2. src/data/blog.json  (build-time — Article.jsx metadata)
  writeFileSync(SRC_META_OUT, JSON.stringify(blogMeta, null, 2), 'utf-8');

  // 3. src/data/blogContent.js  (build-time — Article.jsx conteúdo)
  const jsOut = `// Auto-gerado por scripts/bundle-blog.js — NÃO EDITE MANUALMENTE
// Regenerado automaticamente em cada build / dev start.
const blogContent = ${JSON.stringify(allContent, null, 2)};
export default blogContent;
`;

  const outDir = dirname(CONTENT_OUT);
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  writeFileSync(CONTENT_OUT, jsOut, 'utf-8');

  console.log(`✅ bundle-blog: ${totalPosts} posts | ${totalContent} conteúdos gerados`);
}

main();
