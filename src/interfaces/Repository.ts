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
