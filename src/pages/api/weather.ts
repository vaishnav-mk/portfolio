import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=chennai&units=metric&appid=fe6e83ad9fdf7a3e1ecf5c22e6cc3076`,
  )
  const data = await response.json()
  res.status(200).json(data)
}
