// pages/api/submit-quote.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { XataClient } from '@/src/xata';  // import the client class

// Create a separate client instance for the 'submission' branch
const submissionClient = new XataClient({
  branch: 'submission'
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { anime, character, quote, avatarURL } = req.body;
    const record = await submissionClient.db.quotes.create({
      Anime: anime,
      Character: character,
      Quote: quote,
      AvatarURL: avatarURL || null
    });
    return res.status(200).json(record);
  } catch (err: any) {
    console.error('Submit quote error:', err);
    return res.status(500).json({ error: err.message || 'Failed to submit quote' });
  }
}
