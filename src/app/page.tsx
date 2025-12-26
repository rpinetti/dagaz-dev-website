import HeroSection from '@/components/sections/HeroSection';
import BlogCard from '@/components/cards/BlogCard';
import ProjectCard from '@/components/cards/ProjectCard';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { getFeaturedPosts } from '@/lib/mdx'; // Você precisará implementar esta função
import { getFeaturedRepos } from '@/lib/github'; // Você precisará implementar esta função

export default async function HomePage() {
  const featuredPosts = await getFeaturedPosts(3); // Busca os 3 posts mais recentes/destacados
  const featuredRepos = await getFeaturedRepos(3); // Busca os 3 repositórios mais recentes/destacados

  return (
    <>
      <HeroSection />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h2 className="font-montserrat font-bold text-4xl text-viking-gold text-center mb-12">
          Últimas Publicações
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button variant="secondary" size="lg" as="a" href="/blog">
            Ver Todos os Posts
          </Button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-fjord-blue-dark rounded-xl">
        <h2 className="font-montserrat font-bold text-4xl text-glacial-cyan text-center mb-12">
          Projetos em Destaque
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRepos.map((repo) => (
            <ProjectCard key={repo.id} {...repo} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button variant="tertiary" size="lg" as="a" href="/projects">
            Ver Todos os Projetos
          </Button>
        </div>
      </section>
    </>
  );
}