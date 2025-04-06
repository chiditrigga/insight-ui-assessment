import { NextApiRequest, NextApiResponse } from 'next';
import { trendMockData } from '../../../mocks/trendData';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { hashtag } = req.query;
  const key = (hashtag as string).toLowerCase();
  const data = (trendMockData as Record<string, any>)[key];

  if (!data) {
    return res.status(404).json({ message: 'Hashtag not found' });
  }

  return res.status(200).json(data);
}
