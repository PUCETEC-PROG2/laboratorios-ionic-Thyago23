export interface UserProfile {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  total_private_repos: number;
  followers: number;
}

export interface Repository {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  language: string;
  private: boolean;
  html_url: string;
  owner: {
    avatar_url: string;
    login: string;
  };
}

export interface CreateRepoData {
  name: string;
  description?: string;
  private?: boolean;
}

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
  }
};
