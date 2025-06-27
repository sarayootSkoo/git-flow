import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'cross-fetch';

interface GoldPoint {
  price: number;
  time: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { period = '24h' } = req.query;
    const response = await fetch(
      `https://www.goldapi.io/api/XAU/USD/history?period=${period}`,
      {
        headers: { 'x-access-token': process.env.GOLD_API_KEY || '' }
      }
    );
    const data = await response.json();

    const history: GoldPoint[] = (data || []).map((item: any) => ({
      price: item.price,
      time: item.timestamp
    }));

    res.status(200).json(history);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch gold price history' });
  }
}
