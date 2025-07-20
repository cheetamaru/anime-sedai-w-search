import { malApiAdapter } from '@/services/api/myAnimeListApiAdapter'
import { MalGetListParams } from '@/services/api/types/MalGetListParams';
import type { NextApiRequest, NextApiResponse } from 'next'

const defaultParams: MalGetListParams = {
  status: "completed"
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { username, limit, offset } = req.query

    const result = await malApiAdapter.getUserAnimeList({
      username: String(username),
      params: {
        ...defaultParams,
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined
      }
    });

    res.status(200).json({ result })
  } catch (err) {
    console.log('API ERROR', err)
    res.status(500).json({ error: 'failed to load data' })
  }
}