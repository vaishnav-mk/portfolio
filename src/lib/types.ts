import { MDXRemoteSerializeResult } from 'next-mdx-remote'

export type Views = {
  total: number
}

export type Song = {
  artist: string[]
  songUrl: string
  title: string
  images: string[]
  type: string
  releaseDate: string
  duration: string
  index: number
}

export type NowPlayingSong = {
  album: string
  albumImageUrl: string
  artist: string
  isPlaying: boolean
  songUrl: string
  title: string
}

export type TopTracks = {
  tracks: Array<Song>
}

export type YouTube = {
  subscriberCount: number
  viewCount: number
}

export type GitHub = {
  followers: number
  stars: number
}

export type Post = {
  _id: string
  slug: string
  content: MDXRemoteSerializeResult
  title: string
  date: string
  excerpt: string
  coverImage: string
  readingTime: string
  tweets: any[]
}

export interface contributionCount {
  contributionCount: number
}

export interface week {
  contributionDays: contributionCount[]
}

export interface userDetails {
  totalContributions: number
  contributions: number[]
  name: string
  noOfRepositories: number
  stars: number
  issues: number
  pullRequests: number
  commits: number
  pullRequestReviews: number
  commitRepos: number
  issueRepos: number
  reviewRepos: number
  pullRequestRepos: number
  contributedTo: number
  repositoriesContributedTo: RepositoriesContributedTo[]
}

export interface query {
  query: string
  variables: {
    LOGIN: string
  }
}

export interface RepositoriesContributedTo {
  [x: string]: any
  totalCount: number
  nodes: [
    {
      name: string
      owner: {
        login: string
        avatarUrl: string
      }
      stargazerCount: number
      url: string
    },
  ]
}

export interface GithubContributionsResponse {
  data: {
    user: {
      name: string
      repositories: {
        totalCount: number
        nodes: {
          stargazers: {
            totalCount: number
          }
        }[]
      }
      repositoriesContributedTo: RepositoriesContributedTo[]
      contributionsCollection: {
        totalIssueContributions: number
        totalPullRequestContributions: number
        totalCommitContributions: number
        restrictedContributionsCount: number
        totalPullRequestReviewContributions: number
        totalRepositoriesWithContributedCommits: number
        totalRepositoriesWithContributedIssues: number
        totalRepositoriesWithContributedPullRequestReviews: number
        totalRepositoriesWithContributedPullRequests: number
        totalRepositoryContributions: number
        contributionCalendar: {
          totalContributions: number
          weeks: week[]
        }
      }
    }
  }
}

export type gqlQuery = (username: string) => query

export type fetcher = (
  data: query,
  token: string,
) => Promise<AxiosResponse<GithubContributionsResponse>>

export type fetchContribution = (
  username: string,
  token: string,
) => Promise<userDetails | string>
