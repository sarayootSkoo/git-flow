import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'cross-fetch';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('https://www.goldapi.io/api/XAU/USD', {
      headers: { 'x-access-token': process.env.GOLD_API_KEY || '' }
    });
    const data = await response.json();
    res.status(200).json({ price: data.price, time: new Date().toISOString() });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch gold price' });
  }
}
