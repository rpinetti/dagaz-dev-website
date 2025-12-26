import React from 'react';
import BlogCard from '@/components/cards/BlogCard';
import { getAllPosts } from '@/lib/mdx'; // Você precisará implementar esta função
import { InferGetStaticPropsType } from 'next';

export const getStaticProps = async () => {
  const posts = await getAllPosts();
  return {
    props: { posts },
  };
};

const BlogIndexPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ posts }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="font-montserrat font-bold text-5xl text-viking-gold text-center mb-12">
        Nosso Blog Técnico
      </h1>
      <p className="font-lato text-lg text-runic-white text-center max-w-2xl mx-auto mb-16">
        Explore artigos aprofundados sobre SAP S/4HANA, ABAP, Fiori, otimização de performance e as últimas tendências tecnológicas.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>
    </div>
  );
};

export default BlogIndexPage;