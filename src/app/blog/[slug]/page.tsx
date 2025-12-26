import React from 'react';
import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import Head from 'next/head';
import Image from 'next/image';
import { formatRelativeDate } from '@/lib/formatters';
import Badge from '@/components/ui/Badge';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  return (
    <>
      <Head>
        <title>{post.title} - Dagaz.Dev Blog</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <header className="text-center mb-12">
          <Badge variant="primary" className="mb-4">
            {post.category}
          </Badge>
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl text-viking-gold leading-tight mb-4">
            {post.title}
          </h1>
          <p className="font-lato text-lg text-glacial-cyan mb-6">{post.excerpt}</p>
          <div className="flex justify-center items-center gap-4 text-sm text-forge-gray-light">
            <span>Por {post.author}</span>
            <span>•</span>
            <span>{formatRelativeDate(post.date)}</span>
            <span>•</span>
            <span>{post.readingTime} min de leitura</span>
          </div>
          {post.imageUrl && (
            <div className="relative w-full h-80 mt-8 rounded-xl overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </header>

        <div className="prose prose-invert max-w-none mx-auto">
          <pre className="bg-slate-800 p-4 rounded overflow-auto">{post.content}</pre>
        </div>
      </article>
    </>
  );
}
