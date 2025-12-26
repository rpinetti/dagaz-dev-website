import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.GITHUB_PAT,
});

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

export async function getAllRepos(): Promise<GitHubRepo[]> {
  try {
    const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
    if (!username) {
      console.error('NEXT_PUBLIC_GITHUB_USERNAME não está configurado.');
      return [];
    }

    const { data: repos } = await octokit.repos.listForUser({
      username,
      type: 'owner',
      sort: 'updated',
      direction: 'desc',
      per_page: 100, // Ajuste conforme necessário
    });

    return repos
      .filter(repo => !repo.fork && !repo.archived) // Filtra forks e arquivados
      .map(repo => ({
        id: repo.id as number,
        name: repo.name as string,
        description: repo.description ?? null,
        html_url: repo.html_url as string,
        stargazers_count: repo.stargazers_count ?? 0,
        forks_count: repo.forks_count ?? 0,
        language: repo.language ?? null,
        updated_at: repo.updated_at ?? '',
      }));
  } catch (error) {
    console.error('Erro ao buscar repositórios do GitHub:', error);
    return [];
  }
}

export async function getFeaturedRepos(count: number = 3): Promise<GitHubRepo[]> {
  const allRepos = await getAllRepos();
  const featuredRepoNames = process.env.NEXT_PUBLIC_GITHUB_FEATURED_REPOS?.split(',').map(name => name.trim()) || [];

  if (featuredRepoNames.length > 0) {
    // Prioriza repositórios listados em NEXT_PUBLIC_GITHUB_FEATURED_REPOS
    const explicitFeatured = allRepos.filter(repo => featuredRepoNames.includes(repo.name));
    // Preenche com os mais recentes se não houver o suficiente
    const remaining = allRepos.filter(repo => !explicitFeatured.some(f => f.id === repo.id));
    return [...explicitFeatured, ...remaining].slice(0, count);
  }

  // Se não houver repositórios destacados, retorna os mais recentes
  return allRepos.slice(0, count);
}