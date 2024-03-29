import { gqlQuery } from 'lib/types'

export const contributionQuery: gqlQuery = (username: string) => {
  return {
    query: `
      query userInfo($LOGIN: String!) {
       user(login: $LOGIN) {
         name
         repositories(first: 100, orderBy: {direction: DESC, field: STARGAZERS}) {
           totalCount
           nodes {
              stargazers {
                totalCount
              }
            }
         }
         repositoriesContributedTo(orderBy: {direction: DESC, field: STARGAZERS}, first: 100) {
           totalCount
           nodes {
            name
            owner {
              login
              avatarUrl
            }
            stargazerCount
            url
          }              
         }
         contributionsCollection {
           totalIssueContributions
           totalPullRequestContributions
           totalCommitContributions
           restrictedContributionsCount
           totalPullRequestReviewContributions
           totalRepositoriesWithContributedCommits
           totalRepositoriesWithContributedIssues
           totalRepositoriesWithContributedPullRequestReviews
           totalRepositoriesWithContributedPullRequests
           totalRepositoryContributions
           contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                }
              }
            }
          }
        }
      },
    `,
    variables: {
      LOGIN: username,
    },
  }
}
