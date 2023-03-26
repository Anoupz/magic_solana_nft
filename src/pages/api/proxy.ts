import { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosRequestConfig } from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req
  const url = `https://api-mainnet.magiceden.io/idxv2/getListedNftsByCollectionSymbol?collectionSymbol=${query.collectionSymbol}&onChainCollectionAddress=&direction=1&field=2&limit=100&offset=0`

  try {
    const options: AxiosRequestConfig = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':
          'https://magicsolananft-5lk8wc0ui-anoupz.vercel.app',
      },
    }

    const response = await axios(url, options)
    const data = response.data

    res.status(response.status).json(data)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}
