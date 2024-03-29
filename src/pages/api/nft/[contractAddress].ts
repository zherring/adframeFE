// pages/api/nft.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { contractConfig } from '../../../config';

const defaultAddress = contractConfig.address;

// Define a type for the metadata
type NftMetadata = {
  name: string;
  description: string;
  image: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<NftMetadata | { error: string }>) {
  console.log("logging default", defaultAddress);
  // Extract the contract address from the query parameters or use the default from the contractConfig
  const contractAddress = typeof req.query.contractAddress === 'string'
    ? req.query.contractAddress
    : defaultAddress;

  if (!contractAddress) {
    res.status(400).json({ error: 'Contract address is required' });
    return;
  }

  // Define the metadata structure
  const metadata: NftMetadata = {
    name: "Billboard NFT:" + contractAddress,
    description: "A unique NFT that displays your message on a digital billboard.",
    image: generateImageUrl(contractAddress),
  };

  // Send the metadata as a JSON response
  res.status(200).json(metadata);
}

// This function would create the URL for the image based on the NFT ID.
// It assumes that you have a separate endpoint or service that generates and serves the image.
function generateImageUrl(contractAddress: string): string {
  // Use the VERCEL_URL if available, otherwise default to localhost for development
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` // Vercel automatically provides this as an env variable
    : 'http://localhost:3000';
  
  return `${baseUrl}/api/image/${contractAddress}`;
}
