// pages/api/images/[contractAddress].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import { createCanvas } from 'canvas';
import { retrieveMessage } from '../../../utils/ethersUtils';

// You may want to define the type for the image response or use any to bypass specific typing here.
type ImageResponse = any;

export default async function handler(req: NextApiRequest, res: NextApiResponse<ImageResponse>) {
  const { contractAddress } = req.query;
  
  if (typeof contractAddress !== 'string') {
    return res.status(500).json({ error: 'Default contract address is not configured.' });
  }

  const message = await retrieveMessage(contractAddress);

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
  context.fillStyle = '#000000'; // black background
  context.fillRect(0, 0, width, height);

  context.fillStyle = '#ffffff'; // white text
  context.font = '30px Arial';
  context.fillText(message, 50, 100);

  return canvas.toBuffer();
}
