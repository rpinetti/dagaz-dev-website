import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src', 'content', 'blog');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  author: string;
  readingTime: number; // Em minutos
  imageUrl?: string;
  content: string;
  views?: number;
}

export async function getPostBySlug(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);

  // Calcular tempo de leitura (aproximadamente 200 palavras por minuto)
  const wordsPerMinute = 200;
  const numberOfWords = content.split(/\s/g).length;
  const readingTime = Math.ceil(numberOfWords / wordsPerMinute);

  return {
    slug,
    title: data.title || 'Sem Título',
    date: typeof data.date === 'string' ? data.date : new Date(data.date || new Date()).toISOString(),
    excerpt: data.excerpt || '',
    category: data.category || 'Geral',
    author: data.author || 'Dagaz.Dev',
    readingTime,
    imageUrl: data.imageUrl || '',
    views: data.views || 0,
    content,
  };
}

export async function getAllPosts(): Promise<PostData[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const post = await getPostBySlug(slug);
      return post;
    })
  );

  // Ordenar posts por data (mais recente primeiro)
  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getFeaturedPosts(count: number = 3): Promise<PostData[]> {
  const allPosts = await getAllPosts();
  // Você pode adicionar lógica para posts "destacados" aqui,
  // por exemplo, uma flag `featured: true` no frontmatter.
  // Por enquanto, retorna os `count` posts mais recentes.
  return allPosts.slice(0, count);
}