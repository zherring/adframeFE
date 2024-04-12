// pages/api/nft/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { contractConfig } from './src/config';  // Adjust the import path based on your structure
import { retrieveMessage, retrieveUrl } from './src/utils/ethersUtils';

type NftMetadata = {
  name: string;
  description: string;
  image: string;
  message: string;
  url: string;
};

const contractAddress = contractConfig.address;

const url = await retrieveUrl(contractAddress);
const message = await retrieveMessage(contractAddress);

export default function handler(req: NextApiRequest, res: NextApiResponse<NftMetadata | { error: string }>) {
  const defaultAddress = contractConfig.address;

  if (!defaultAddress) {
    return res.status(500).json({ error: 'Default contract address is not configured.' });
  }

  // Define the metadata structure using the default contract address
  const metadata: NftMetadata = {
    name: "Billboard NFT:" + defaultAddress,
    description: "A unique NFT that displays your message on a digital billboard.",
    image: generateImageUrl(defaultAddress),
    message: message,
    url: url,
  };

  // Send the metadata as a JSON response
  res.status(200).json(metadata);
}

// This function generates the URL for the image based on the contract address.
function generateImageUrl(contractAddress: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` // Use the deployment base URL if available
    : 'http://localhost:3000';  // Fallback to localhost for development
  
  return `${baseUrl}/api/nft/image`;
}
