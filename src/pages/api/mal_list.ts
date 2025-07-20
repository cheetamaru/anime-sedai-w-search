import type { NextApiRequest, NextApiResponse } from 'next'
import { getFullMalList } from '../serverUtils/getFullMalList';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { username } = req.query

    const result = await getFullMalList(String(username));

    res.status(200).json({ result })
  } catch (err) {
    console.log('API ERROR', err)
    res.status(500).json({ error: 'failed to load data' })
  }
}