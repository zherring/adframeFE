import { NextApiRequest, NextApiResponse } from 'next';
import { createCanvas } from 'canvas';
import { contractConfig } from '../../../config';
import { retrieveMessage } from '../../../utils/ethersUtils';

const defaultAddress = contractConfig.address;

// You may want to define the type for the image response or use any to bypass specific typing here.
type ImageResponse = any;

export default async function handler(req: NextApiRequest, res: NextApiResponse<ImageResponse>) {
  if (!defaultAddress) {
    return res.status(500).json({ error: 'Default contract address is not configured.' });
  }

  const message = await retrieveMessage(defaultAddress);

  const image = await generateNftImage(message);
  res.setHeader('Content-Type', 'image/png');
  res.send(image);
}


async function generateNftImage(message: string): Promise<Buffer> {
  const width = 800;
  const height = 600;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');

  // Basic image generation: background and message
  context.fillStyle = '#000000';
  context.fillRect(0, 0, width, height);

  context.fillStyle = '#ffffff'; 
  context.font = '30px Arial';
  context.fillText(message, 50, 100);

  return canvas.toBuffer();
}
