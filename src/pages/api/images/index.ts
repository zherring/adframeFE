import { NextApiRequest, NextApiResponse } from 'next';
import { registerFont, createCanvas } from 'canvas';
import { contractConfig } from '../../../config';
import { retrieveMessage, retrieveUrl } from '../../../utils/ethersUtils';
import path from 'path';

const defaultAddress = contractConfig.address;

// registerFont('../../../public/fonts/SplineSansMono-Medium.ttf', { family: 'sans-serif' });
registerFont(path.resolve('./public/fonts/SplineSansMono-Medium.ttf'), { family: 'Spline' });

// You may want to define the type for the image response or use any to bypass specific typing here.
type ImageResponse = any;

export default async function handler(req: NextApiRequest, res: NextApiResponse<ImageResponse>) {
  if (!defaultAddress) {
    return res.status(500).json({ error: 'Default contract address is not configured.' });
  }

  const message = await retrieveMessage(defaultAddress);
  const url = await retrieveUrl(defaultAddress);

  const image = await generateNftImage(message, url);
  res.setHeader('Content-Type', 'image/png');
  res.send(image);
}


async function generateNftImage(message: string, url: string): Promise<Buffer> {
  try {

    const width = 800;
    const height = 600;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');

  // Basic image generation: background and message
  context.fillStyle = '#000000';
  context.fillRect(0, 0, width, height);
  
  // Draw the message
  context.fillStyle = '#ffffff'; 
  context.font = '40px Spline'; // Larger font size
  context.textAlign = 'center'; // Center the text horizontally
  context.textBaseline = 'middle'; // Center the text vertically
  context.fillText(message, width / 2, height / 2 - 20); // Adjust the vertical position
  
  // Draw the URL
  context.font = '20px Spline'; // Smaller font size
  context.fillText(url, width / 2, height / 2 + 20); // Adjust the vertical position
  
  return canvas.toBuffer();
  } catch(error) {
    console.log('error generating image:', error);
    throw error;
  }
}
