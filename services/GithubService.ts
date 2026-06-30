import { UserProfile, Repository, CreateRepoData, UpdateRepoData } from '../src/interfaces/Repository';

const GITHUB_API_URL = 'https://api.github.com';

const getHeaders = () => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  return {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json'
  };
};

export const githubService = {
  getProfile: async (): Promise<UserProfile> => {
    const response = await fetch(`${GITHUB_API_URL}/user`, {
      headers: getHeaders()
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.statusText}`);
    }
    return response.json();
  },

  getRepos: async (): Promise<Repository[]> => {
    const response = await fetch(`${GITHUB_API_URL}/user/repos?sort=updated`, {
      headers: getHeaders()
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch repositories: ${response.statusText}`);
    }
    return response.json();
  },

  createRepo: async (repoData: CreateRepoData): Promise<Repository> => {
    const response = await fetch(`${GITHUB_API_URL}/user/repos`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(repoData)
    });
    if (!response.ok) {
      throw new Error(`Failed to create repository: ${response.statusText}`);
    }
    return response.json();
  },

  deleteRepo: async (owner: string, repo: string): Promise<void> => {
    const response = await fetch(`${GITHUB_API_URL}/repos/${owner}/${repo}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!response.ok) {
      throw new Error(`Failed to delete repository: ${response.statusText}`);
    }
  },

  updateRepo: async (owner: string, repo: string, repoData: UpdateRepoData): Promise<Repository> => {
    const response = await fetch(`${GITHUB_API_URL}/repos/${owner}/${repo}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(repoData)
    });
    if (!response.ok) {
      throw new Error(`Failed to update repository: ${response.statusText}`);
    }
    return response.json();
  }
};
