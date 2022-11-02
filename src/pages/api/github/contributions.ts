import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchContributions } from 'lib/github/fetchContributions'

const TOKEN = process.env.GITHUB_TOKEN

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  const data = await fetchContributions('vaishnav-mk', TOKEN || '')
  res.status(200).json(data)
}

export default handler
