import { contributionCount, userDetails, query } from 'lib/types'
import { contributionQuery } from './queries'

import axios from 'axios'

const fetch = (data: query, token: string) => {
  const res = axios({
    url: 'https://api.github.com/graphql',
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`,
    },
    data,
  })

  return res
}

export const fetchContributions = async (username: string, token: string) => {
  try {
    const apiResponse = await fetch(contributionQuery(username), token)

    const User = apiResponse.data.data.user

    if (User === null)
      return `Can't fetch any contribution. Please check your username 😬`

    let userData: userDetails = {
      totalContributions:
        User.contributionsCollection.contributionCalendar.totalContributions,
      contributions: [],
      name: User.name,
      noOfRepositories: User.repositories.totalCount,
      commitRepos:
        User.contributionsCollection.totalRepositoriesWithContributedCommits,
      commits: User.contributionsCollection.totalCommitContributions,
      issueRepos:
        User.contributionsCollection.totalRepositoriesWithContributedIssues,
      issues: User.contributionsCollection.totalIssueContributions,
      pullRequestRepos:
        User.contributionsCollection
          .totalRepositoriesWithContributedPullRequests,
      pullRequests: User.contributionsCollection.totalPullRequestContributions,
      reviewRepos:
        User.contributionsCollection
          .totalRepositoriesWithContributedPullRequestReviews,
      pullRequestReviews:
        User.contributionsCollection.totalPullRequestReviewContributions,
      stars: 0,
      contributedTo: User.repositoriesContributedTo.totalCount,
      repositoriesContributedTo: User.repositoriesContributedTo.nodes,
    }

    const weeks = User.contributionsCollection.contributionCalendar.weeks

    weeks
      .slice(weeks.length - 6, weeks.length)
      .map((week: any) =>
        week.contributionDays.map((contributionCount: contributionCount) =>
          userData.contributions.push(contributionCount.contributionCount),
        ),
      )

    const presentDay = new Date().getDay()
    userData.contributions = userData.contributions.slice(
      5 + presentDay,
      36 + presentDay,
    )
    const total = User.repositories.nodes.reduce(
      (a: any, d: any) => a + d.stargazers.totalCount,
      0,
    )
    userData.stars = total
    return userData
  } catch (error) {
    return error
  }
}
