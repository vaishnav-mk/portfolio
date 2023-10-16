import type { NextApiRequest, NextApiResponse } from 'next'
import { parseStringPromise } from "xml2js";

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await fetch('https://medium.com/feed/@wishee')
    const xmlData = await response.text()

    const jsonResult = await parseStringPromise(xmlData, {
      explicitArray: false,
      ignoreAttrs: true,
      mergeAttrs: true,
    })
    return res.status(200).json(jsonResult)
  } catch (error) {
    console.error('Error fetching Medium feed:', error)
    return res.status(500).json({ error: 'Error fetching Medium feed' })
  }
}

export default handler
