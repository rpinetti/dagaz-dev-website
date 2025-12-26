import React from 'react';
import ProjectCard from '@/components/cards/ProjectCard';
import { getAllRepos } from '@/lib/github';

export const revalidate = 3600;

export default async function ProjectsPage() {
  const repos = await getAllRepos();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="font-montserrat font-bold text-5xl text-glacial-cyan text-center mb-12">
        Meus Projetos no GitHub
      </h1>
      <p className="font-lato text-lg text-runic-white text-center max-w-2xl mx-auto mb-16">
        Uma coleção de repositórios open-source, ferramentas e exemplos de código focados em SAP S/4HANA, ABAP e Fiori.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {repos.map((repo) => (
          <ProjectCard key={repo.id} {...repo} />
        ))}
      </div>
    </div>
  );
}
