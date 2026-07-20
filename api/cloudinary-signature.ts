import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

const UPLOAD_FOLDER = 'birdhouse-uploads';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

  if (!apiKey || !apiSecret || !cloudName) {
    res.status(500).json({ error: 'Cloudinary is not configured on the server.' });
    return;
  }

  const timestamp = Math.round(Date.now() / 1000);
  const paramsToSign = `folder=${UPLOAD_FOLDER}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash('sha1').update(paramsToSign).digest('hex');

  res.status(200).json({
    signature,
    timestamp,
    apiKey,
    cloudName,
    folder: UPLOAD_FOLDER
  });
}
