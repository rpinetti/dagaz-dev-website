'use client';

import { useState, useEffect } from 'react';
import { getAllRepos, GitHubRepo } from '@/lib/github';

export function useGitHubRepos() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const fetchedRepos = await getAllRepos();
        setRepos(fetchedRepos);
      } catch (err) {
        setError('Falha ao carregar repositórios do GitHub.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return { repos, loading, error };
}