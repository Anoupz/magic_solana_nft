import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'GET') {
    try {
      const { data } = await axios.get(
        'https://api-mainnet.magiceden.dev/v2/collections/okay_bears/listings?offset=0&limit=20'
      )
      res.json(data)
    } catch (err) {
      res.status(500).send({
        message: err,
      })
    }
  } else {
    res.status(405).end() // Method Not Allowed
  }
}
