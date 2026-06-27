export interface GithubUser {
    id: number;
    login: string;
    avatar_url: string;
    name: string;
    bio?: string;
    public_repos: number;
}