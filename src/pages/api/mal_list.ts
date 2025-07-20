import type { NextApiRequest, NextApiResponse } from 'next'
import { getIntersectedMalList } from '../../modules/serverUtils/getIntersectedMalList';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { username } = req.query

    const result = await getIntersectedMalList(String(username));

    res.status(200).json({ result })
  } catch (err) {
    console.log('API ERROR', err)
    res.status(500).json({ error: 'failed to load data' })
  }
}