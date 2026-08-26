// Typed subset of the GitHub REST API responses used by this site.
// Populated in phase 2 alongside the service layer.

export type GitHubUser = {
  login: string
  name: string | null
  avatar_url: string
  html_url: string
  bio: string | null
  followers: number
  following: number
  public_repos: number
}

export type GitHubRepo = {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  fork: boolean
  archived: boolean
  updated_at: string
}
