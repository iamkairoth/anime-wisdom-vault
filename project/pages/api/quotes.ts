// pages/api/quotes.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getXataClient } from '@/src/xata';    // adjust path if needed

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow GET
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Log the two critical pieces of config
  console.log('> XATA_API_KEY:', process.env.XATA_API_KEY ? '✅ set' : '❌ MISSING');
  console.log('> databaseURL:', process.env.XATA_DATABASE_URL);

  try {
    const xata = getXataClient();
    console.log('> xata client created:', typeof xata.db.quotes.getAll === 'function');

    // Try fetching
    const records = await xata.db.quotes.getAll();
    console.log('> fetched records:', Array.isArray(records) ? records.length : records);

    return res.status(200).json(records);
  } catch (err: any) {
    // Print full Error object
    console.error('❌ Xata fetch error:', err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}
