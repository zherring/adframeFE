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



// async function retrieveMessage(contractAddress: string): Promise<string> {
//     // Initialize the ethers provider with the Sepolia Base RPC URL
//     const provider = new ethers.JsonRpcProvider(baseProviderUrl);
  
//     // Create an instance of the contract using the provider and the ABI
//     const contract = new ethers.Contract(contractAddress, abi, provider);
  
//     try {
//       // Call the billboard function from your contract
//       const message = await contract.billboard();
//       return message;
//     } catch (error) {
//       console.error('Error fetching the billboard message from Sepolia Base:', error);
//       throw new Error('Failed to retrieve the billboard message.');
//     }
//   }

async function generateNftImage(message: string): Promise<Buffer> {
  const width = 800;
  const height = 600;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');

  // Basic image generation: background and message
  context.fillStyle = '#FFFFFF'; // White background
  context.fillRect(0, 0, width, height);

  context.fillStyle = '#000000'; // Black text
  context.font = '30px Arial';
  context.fillText(message, 50, 100);

  return canvas.toBuffer();
}
